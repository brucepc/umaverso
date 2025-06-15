import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { Customer } from '@models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private firestore: Firestore = inject(Firestore);
  private customersCollection = collection(this.firestore, 'customers');

  constructor() { }

  getCustomers(): Observable<Customer[]> {
    const q = query(this.customersCollection, where('isActive', '==', true));
    return collectionData(q, { idField: 'id' }) as Observable<Customer[]>;
  }

  addCustomer(customer: Omit<Customer, 'id'>) {
    return addDoc(this.customersCollection, customer);
  }

  updateCustomer(customer: Customer) {
    const customerDocRef = doc(this.firestore, `customers/${customer.id}`);
    const { id, ...data } = customer;
    return updateDoc(customerDocRef, data);
  }

  toggleIsActive(customer: Customer) {
    const customerDocRef = doc(this.firestore, `customers/${customer.id}`);
    return updateDoc(customerDocRef, { isActive: !customer.isActive });
  }
}
