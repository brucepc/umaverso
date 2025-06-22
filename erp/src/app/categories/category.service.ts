import { Injectable, inject, runInInjectionContext, Injector } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);
  private categoriesCollection: CollectionReference<DocumentData> = collection(
    this.firestore,
    'categories'
  );

  getCategories(): Observable<Category[]> {
    return runInInjectionContext(this.injector, () => {
      return collectionData(this.categoriesCollection, {
        idField: 'id',
      }) as Observable<Category[]>;
    });
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
