import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, query, where, collectionData, orderBy, Transaction } from '@angular/fire/firestore';
import { StockMovement } from '@models/stock-movement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockMovementService {
  private firestore: Firestore = inject(Firestore);
  private movementsCollection = collection(this.firestore, 'stockMovements');

  constructor() { }

  getMovementsForProduct(productId: string): Observable<StockMovement[]> {
    const q = query(
      this.movementsCollection, 
      where('productId', '==', productId),
      orderBy('timestamp', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<StockMovement[]>;
  }

  /**
   * Adds a stock movement record within a Firestore transaction.
   * This is intended to be called from other service methods that manage stock.
   * @param transaction The Firestore transaction object.
   * @param movementData The data for the stock movement, without the 'id'.
   */
  addMovement(transaction: Transaction, movementData: Omit<StockMovement, 'id'>) {
    // Note: We don't get the auto-generated ID immediately this way,
    // but we ensure atomicity. We can create a new doc ref to use.
    const newMovementRef = doc(this.movementsCollection);
    transaction.set(newMovementRef, movementData);
  }
}
