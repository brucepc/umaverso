import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.categoriesCollection = collection(this.firestore, 'categories');
  }

  getCategories(): Observable<Category[]> {
    return collectionData(this.categoriesCollection, { idField: 'id' }) as Observable<Category[]>;
  }

  addCategory(category: Omit<Category, 'id'>) {
    return addDoc(this.categoriesCollection, category);
  }

  updateCategory(category: Category) {
    const categoryDocRef = doc(this.firestore, `categories/${category.id}`);
    const { id, ...dataToUpdate } = category;
    return updateDoc(categoryDocRef, dataToUpdate);
  }
}
