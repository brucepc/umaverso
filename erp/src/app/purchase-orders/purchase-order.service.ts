import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  PurchaseOrder,
  PurchaseOrderStatus,
} from '@models/purchase-order.model';
import { AccountPayableService } from '../accounts-payable/account-payable.service';
import { Timestamp } from '@angular/fire/firestore';
import {
  AccountPayable,
  AccountPayableStatus,
} from '@models/account-payable.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private firestore: Firestore = inject(Firestore);
  private accountPayableService = inject(AccountPayableService);

  private ordersCollection = collection(this.firestore, 'purchaseOrders');

  private calculateOrderTotals(
    order: Partial<PurchaseOrder>
  ): Partial<PurchaseOrder> {
    if (!order.items) {
      return { ...order, total: 0 };
    }

    let total = 0;
    const itemsWithTotal = order.items.map((item) => {
      const itemTotal = (item.quantity || 0) * (item.unitCost || 0);
      total += itemTotal;
      return { ...item, totalPrice: itemTotal };
    });

    return { ...order, items: itemsWithTotal, total };
  }

  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    return collectionData(this.ordersCollection, { idField: 'id' }) as Observable<
      PurchaseOrder[]
    >;
  }

  addPurchaseOrder(
    order: Omit<PurchaseOrder, 'id' | 'status' | 'code'>
  ): Promise<any> {
    const calculatedOrder = this.calculateOrderTotals(
      order as Partial<PurchaseOrder>
    );

    const orderWithDefaults = {
      ...calculatedOrder,
      code: `PO-${Date.now()}`,
      status: PurchaseOrderStatus.PENDING_APPROVAL,
    };
    return addDoc(this.ordersCollection, orderWithDefaults);
  }

  updatePurchaseOrder(
    id: string,
    order: Partial<PurchaseOrder>
  ): Promise<void> {
    const orderDoc = doc(this.firestore, `purchaseOrders/${id}`);
    const calculatedOrder = this.calculateOrderTotals(order);
    return updateDoc(orderDoc, calculatedOrder);
  }

  deletePurchaseOrder(id: string): Promise<void> {
    const orderDoc = doc(this.firestore, `purchaseOrders/${id}`);
    return deleteDoc(orderDoc);
  }

  updatePurchaseOrderStatus(
    orderId: string,
    status: PurchaseOrderStatus
  ): Promise<void> {
    const orderDoc = doc(this.firestore, `purchaseOrders/${orderId}`);
    return updateDoc(orderDoc, { status });
  }

  async approvePurchaseOrder(order: PurchaseOrder): Promise<void> {
    if (!order || !order.id) {
      throw new Error('Invalid purchase order data.');
    }

    // First, update the order status
    await this.updatePurchaseOrderStatus(order.id, PurchaseOrderStatus.APPROVED);

    // Default due date to 30 days from now
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    // Check if it's a single-supplier order
    if (order.supplierId && order.supplierName) {
      const newPayable: Omit<AccountPayable, 'id'> = {
        supplierId: order.supplierId,
        supplierName: order.supplierName,
        purchaseOrderId: order.id,
        purchaseOrderCode: order.code,
        issueDate: Timestamp.now(),
        dueDate: Timestamp.fromDate(dueDate),
        totalAmount: order.total,
        status: AccountPayableStatus.OPEN,
        installments: 1,
      };
      await this.accountPayableService.addAccountPayable(newPayable);
    } else {
      // Marketplace-style order: Group items by supplier and create multiple payables
      const payablesBySupplier = order.items.reduce((acc, item) => {
        if (!item.supplierId || !item.supplierName) return acc;
        
        if (!acc[item.supplierId]) {
          acc[item.supplierId] = {
            supplierId: item.supplierId,
            supplierName: item.supplierName,
            purchaseOrderId: order.id,
            purchaseOrderCode: order.code,
            issueDate: Timestamp.now(),
            dueDate: Timestamp.fromDate(dueDate),
            totalAmount: 0,
            status: AccountPayableStatus.OPEN,
            installments: 1,
          };
        }
        acc[item.supplierId].totalAmount += (item.unitCost || 0) * (item.quantity || 0);
        return acc;
      }, {} as { [key: string]: Omit<AccountPayable, 'id'> });

      // Create a payable for each supplier
      for (const supplierId in payablesBySupplier) {
        await this.accountPayableService.addAccountPayable(payablesBySupplier[supplierId]);
      }
    }
  }

  rejectPurchaseOrder(orderId: string): Promise<void> {
    return this.updatePurchaseOrderStatus(orderId, PurchaseOrderStatus.CANCELED);
  }
}
