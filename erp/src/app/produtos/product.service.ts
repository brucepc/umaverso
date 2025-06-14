import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.productsCollection = collection(this.firestore, 'products');
  }

  getProducts(): Observable<Produto[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Produto[]>;
  }

  addProduct(produto: Omit<Produto, 'id'>) {
    return addDoc(this.productsCollection, produto);
  }

  updateProduct(produto: Produto) {
    const productDocRef = doc(this.firestore, `products/${produto.id}`);
    const { id, ...dataToUpdate } = produto;
    return updateDoc(productDocRef, dataToUpdate);
  }

  toggleIsActive(produto: Produto) {
    const productDocRef = doc(this.firestore, `products/${produto.id}`);
    return updateDoc(productDocRef, { isActive: !produto.isActive });
  }
}
