import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, updateDoc, runTransaction, DocumentReference, Timestamp, writeBatch } from '@angular/fire/firestore';
import { SalesOrder } from '@models/sales-order.model';
import { Observable } from 'rxjs';
import { ProductService } from '../products/product.service';
import { Product } from '@models/product.model';
import { AccountReceivable } from '@models/account-receivable.model';
import { Customer } from '@models/customer.model';

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
    const productsCollection = collection(this.firestore, 'products');
    const accountsReceivableCollection = collection(this.firestore, 'accountsReceivable');
    
    await runTransaction(this.firestore, async (transaction) => {
      // 1. Update stock for all items
      const stockUpdatePromises = order.items.map(async (item) => {
        const productRef = doc(productsCollection, item.productId) as DocumentReference<Product>;
        const productSnap = await transaction.get(productRef);
        if (!productSnap.exists()) {
          throw new Error(`Produto ${item.productName} não encontrado.`);
        }
        const newStock = productSnap.data().currentStock - item.quantity;
        if (newStock < 0) {
          throw new Error(`Stock insuficiente para ${item.productName}.`);
        }
        transaction.update(productRef, { currentStock: newStock });
      });
      await Promise.all(stockUpdatePromises);

      // 2. Create Account Receivable
      const customerRef = doc(this.firestore, `customers/${order.customerId}`) as DocumentReference<Customer>;
      const customerSnap = await transaction.get(customerRef);
      const customerName = customerSnap.exists() ? customerSnap.data().name : 'Cliente não encontrado';

      const issueDate = Timestamp.now();
      const dueDate = new Timestamp(issueDate.seconds + (30 * 24 * 60 * 60), issueDate.nanoseconds); // Due in 30 days

      const newAccountReceivable: Omit<AccountReceivable, 'id'> = {
        customerId: order.customerId,
        customerName: customerName,
        salesOrderId: order.id,
        salesOrderCode: order.code || order.id,
        issueDate: issueDate,
        dueDate: dueDate,
        totalAmount: order.total,
        status: 'Aberta'
      };
      
      const arDocRef = doc(accountsReceivableCollection); // Create a new doc reference
      transaction.set(arDocRef, newAccountReceivable);

      // 3. Update order status
      const orderRef = doc(this.salesOrdersCollection, order.id);
      transaction.update(orderRef, { status: 'INVOICED' });
    });
  }
}
