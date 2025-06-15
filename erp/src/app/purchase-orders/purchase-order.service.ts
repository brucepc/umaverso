import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '@models/purchase-order.model';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private firestore: Firestore = inject(Firestore);
  private purchaseOrdersCollection;

  constructor() {
    this.purchaseOrdersCollection = collection(this.firestore, 'purchaseOrders');
  }

  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    return collectionData(this.purchaseOrdersCollection, { idField: 'id' }) as Observable<PurchaseOrder[]>;
  }

  getPurchaseOrderById(id: string): Observable<PurchaseOrder> {
    const poDoc = doc(this.firestore, `purchaseOrders/${id}`);
    return docData(poDoc, { idField: 'id' }) as Observable<PurchaseOrder>;
  }

  addPurchaseOrder(purchaseOrder: Omit<PurchaseOrder, 'id'>) {
    return addDoc(this.purchaseOrdersCollection, purchaseOrder);
  }

  updatePurchaseOrder(purchaseOrder: PurchaseOrder) {
    const poDoc = doc(this.firestore, `purchaseOrders/${purchaseOrder.id}`);
    const { id, ...data } = purchaseOrder;
    return updateDoc(poDoc, data);
  }

  updatePurchaseOrderStatus(id: string, status: 'OPEN' | 'CANCELED' | 'RECEIVED') {
    const poDoc = doc(this.firestore, `purchaseOrders/${id}`);
    return updateDoc(poDoc, { status });
  }

  deletePurchaseOrder(id: string) {
    const poDoc = doc(this.firestore, `purchaseOrders/${id}`);
    return deleteDoc(poDoc);
  }
} 