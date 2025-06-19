import { Injectable, inject, runInInjectionContext, Injector } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Supplier } from '@models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private firestore: Firestore = inject(Firestore);
  private suppliersCollection = collection(this.firestore, 'suppliers');
  private injector = inject(Injector);

  getSuppliers = (): Observable<Supplier[]> => {
    return runInInjectionContext(this.injector, () =>
      collectionData(this.suppliersCollection, { idField: 'id' }) as Observable<Supplier[]>
    );
  }

  addSupplier(supplier: Omit<Supplier, 'id'>) {
    return addDoc(this.suppliersCollection, supplier);
  }

  updateSupplier(supplier: Supplier) {
    const supplierDoc = doc(this.firestore, `suppliers/${supplier.id}`);
    const { id, ...data } = supplier;
    return updateDoc(supplierDoc, data);
  }

  deleteSupplier(id: string) {
    const supplierDoc = doc(this.firestore, `suppliers/${id}`);
    return deleteDoc(supplierDoc);
  }

  updateSupplierStatus(id: string, isActive: boolean) {
    const supplierDoc = doc(this.firestore, `suppliers/${id}`);
    return updateDoc(supplierDoc, { isActive });
  }
} 