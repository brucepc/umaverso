import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  collectionData
} from '@angular/fire/firestore';
import { ECommerceProductDetails } from '@models/ecommerce-product-details.model';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ECommerceProductService {
  private firestore: Firestore = inject(Firestore);
  private readonly collectionName = 'ecommerceProductDetails';

  constructor() {}

  // Get E-commerce details by Product ID
  getDetailsByProductId(productId: string): Observable<ECommerceProductDetails | null> {
    const q = query(collection(this.firestore, this.collectionName), where('productId', '==', productId));
    return (collectionData(q, { idField: 'id' }) as Observable<ECommerceProductDetails[]>).pipe(
      map(results => (results.length > 0 ? results[0] : null))
    );
  }

  // Create a new E-commerce details entry
  createDetails(productId: string, details: Partial<Omit<ECommerceProductDetails, 'id' | 'productId'>>): Observable<string> {
    const docToCreate = {
      ...details,
      productId: productId
    };
    return from(addDoc(collection(this.firestore, this.collectionName), docToCreate)).pipe(
      map(docRef => docRef.id)
    );
  }

  // Update E-commerce details
  updateDetails(id: string, details: Partial<ECommerceProductDetails>): Observable<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(updateDoc(docRef, details));
  }

  // Delete E-commerce details
  deleteDetails(id: string): Observable<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(deleteDoc(docRef));
  }

  /**
   * Gets or creates the E-commerce details for a product.
   * If details don't exist, it creates a default entry.
   */
  findOrCreateDetails(productId: string): Observable<ECommerceProductDetails> {
    return this.getDetailsByProductId(productId).pipe(
      switchMap(details => {
        if (details) {
          return of(details);
        } else {
          // Create with default values if it doesn't exist
          const defaultDetails: Partial<Omit<ECommerceProductDetails, 'id' | 'productId'>> = {
            displayInOnlineStore: false,
            onSale: false,
            taxRate: 0,
          };
          return this.createDetails(productId, defaultDetails).pipe(
            switchMap(newId => {
              return this.getDetailsByProductId(productId).pipe(
                map(createdDoc => {
                  if (!createdDoc) throw new Error('Failed to retrieve created document');
                  return createdDoc;
                })
              );
            })
          );
        }
      })
    );
  }
}
