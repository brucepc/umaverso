import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { SalesOrder } from '@models/sales-order.model';
import { Observable } from 'rxjs';
import { ProductService } from '../products/product.service';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {
  private firestore: Firestore = inject(Firestore);
  private salesOrdersCollection = collection(this.firestore, 'salesOrders');
  private productService = inject(ProductService);

  constructor() { }

  getSalesOrders(): Observable<SalesOrder[]> {
    return collectionData(this.salesOrdersCollection, { idField: 'id' }) as Observable<SalesOrder[]>;
  }

  getSalesOrderById(id: string): Observable<SalesOrder> {
    const soDoc = doc(this.firestore, `salesOrders/${id}`);
    return docData(soDoc, { idField: 'id' }) as Observable<SalesOrder>;
  }

  addSalesOrder(salesOrder: Omit<SalesOrder, 'id'>) {
    return addDoc(this.salesOrdersCollection, salesOrder);
  }

  updateSalesOrder(salesOrder: SalesOrder) {
    const soDoc = doc(this.firestore, `salesOrders/${salesOrder.id}`);
    const { id, ...data } = salesOrder;
    return updateDoc(soDoc, data);
  }

  updateSalesOrderStatus(id: string, status: SalesOrder['status']) {
    const soDoc = doc(this.firestore, `salesOrders/${id}`);
    return updateDoc(soDoc, { status });
  }

  async processInvoice(order: SalesOrder): Promise<void> {
    // Step 1: Update stock for all items
    const stockUpdatePromises = order.items.map(item => {
      const stockUpdateData = {
        productId: item.productId,
        quantityChange: -item.quantity, // Negative quantity for dispatch
        movementType: 'SALE_DISPATCH' as const,
        referenceId: order.id
      };
      return this.productService.updateStock(stockUpdateData);
    });

    await Promise.all(stockUpdatePromises);

    // Step 2: Update order status
    await this.updateSalesOrderStatus(order.id, 'INVOICED');
  }
}
