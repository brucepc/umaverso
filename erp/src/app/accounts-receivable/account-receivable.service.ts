import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  Timestamp
} from '@angular/fire/firestore';
import { AccountReceivable } from '@models/account-receivable.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountReceivableService {
  private firestore: Firestore = inject(Firestore);
  private accountsReceivableCollection;

  constructor() {
    this.accountsReceivableCollection = collection(this.firestore, 'accountsReceivable');
  }

  getAccountsReceivable(): Observable<AccountReceivable[]> {
    return collectionData(this.accountsReceivableCollection, {
      idField: 'id',
    }) as Observable<AccountReceivable[]>;
  }

  updatePaymentStatus(id: string, status: 'Aberta' | 'Liquidada') {
    const accountDoc = doc(this.firestore, `accountsReceivable/${id}`);
    const updateData: { status: 'Aberta' | 'Liquidada', settlementDate?: Timestamp } = { status };
    if (status === 'Liquidada') {
      updateData.settlementDate = Timestamp.now();
    } else {
      updateData.settlementDate = undefined;
    }
    return updateDoc(accountDoc, updateData);
  }
} 