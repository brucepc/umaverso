import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import {
  collectionData,
  Firestore,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  collection,
} from '@angular/fire/firestore';
import {
  AccountPayable,
  AccountPayableStatus,
} from '@models/account-payable.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountPayableService {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);
  private payablesCollection = collection(this.firestore, 'accountsPayable');

  getAccountsPayable(): Observable<AccountPayable[]> {
    return runInInjectionContext(this.injector, () =>
      collectionData(this.payablesCollection, {
        idField: 'id',
      })
    ) as Observable<AccountPayable[]>;
  }

  addAccountPayable(payable: Omit<AccountPayable, 'id'>): Promise<any> {
    return runInInjectionContext(this.injector, () =>
      addDoc(this.payablesCollection, payable)
    );
  }

  updateAccountPayable(
    id: string,
    payable: Partial<AccountPayable>
  ): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const payableDoc = doc(this.firestore, `accountsPayable/${id}`);
      return updateDoc(payableDoc, payable);
    });
  }

  deleteAccountPayable(id: string): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const payableDoc = doc(this.firestore, `accountsPayable/${id}`);
      return deleteDoc(payableDoc);
    });
  }

  approvePayable(id: string): Promise<void> {
    return this.updateAccountPayable(id, {
      status: AccountPayableStatus.APPROVED,
    });
  }

  rejectPayable(id: string): Promise<void> {
    return this.updateAccountPayable(id, {
      status: AccountPayableStatus.REJECTED,
    });
  }
} 