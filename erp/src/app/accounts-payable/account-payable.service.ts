import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { AccountPayable } from '@models/account-payable.model';
import { Observable } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AccountPayableService {
  private firestore: Firestore = inject(Firestore);
  private accountsPayableCollection;

  constructor() {
    this.accountsPayableCollection = collection(this.firestore, 'accountsPayable');
  }

  getAccountsPayable(): Observable<AccountPayable[]> {
    return collectionData(this.accountsPayableCollection, {
      idField: 'id',
    }) as Observable<AccountPayable[]>;
  }

  updatePaymentStatus(id: string, status: 'Aberta' | 'Liquidada') {
    const accountDoc = doc(this.firestore, `accountsPayable/${id}`);
    const updateData: { status: 'Aberta' | 'Liquidada', settlementDate?: Timestamp } = { status };
    if (status === 'Liquidada') {
      updateData.settlementDate = Timestamp.now();
    } else {
      updateData.settlementDate = undefined;
    }
    return updateDoc(accountDoc, updateData);
  }
} 