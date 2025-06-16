import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  runTransaction,
  updateDoc,
  Timestamp,
  query,
  where,
} from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { StockMovement } from '@models/stock-movement.model';
import { StockMovementService } from '../stock-movements/stock-movement.service';
import { ProductType } from '@models/product-type.enum';

interface StockUpdateData {
  productId: string;
  quantityChange: number;
  movementType: StockMovement['movementType'];
  referenceId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private firestore: Firestore = inject(Firestore);
  private productsCollection = collection(this.firestore, 'products');
  private stockMovementService = inject(StockMovementService);

  constructor() { }

  getProducts(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  getRawMaterials(): Observable<Product[]> {
    const q = query(this.productsCollection, where('productType', '==', ProductType.MateriaPrima), where('isActive', '==', true));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  getFinishedGoods(): Observable<Product[]> {
    const q = query(this.productsCollection, where('productType', '==', ProductType.FabricoProprio), where('isActive', '==', true));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  addProduct(product: Omit<Product, 'id'>) {
    return addDoc(this.productsCollection, product);
  }

  updateProduct(product: Product) {
    const productDocRef = doc(this.firestore, `products/${product.id}`);
    const { id, ...dataToUpdate } = product;
    return updateDoc(productDocRef, dataToUpdate);
  }

  toggleIsActive(product: Product) {
    const productDocRef = doc(this.firestore, `products/${product.id}`);
    return updateDoc(productDocRef, { isActive: !product.isActive });
  }

  async updateStock(data: StockUpdateData): Promise<void> {
    const productDocRef = doc(this.firestore, `products/${data.productId}`);
    
    return runTransaction(this.firestore, async (transaction) => {
      const productDoc = await transaction.get(productDocRef);
      if (!productDoc.exists()) {
        throw new Error(`Product with ID ${data.productId} does not exist!`);
      }
      
      const productData = productDoc.data() as Product;
      const currentStock = productData.currentStock || 0;
      const newStock = currentStock + data.quantityChange;
      
      // Step 1: Create the stock movement log
      const movementLog: Omit<StockMovement, 'id'> = {
        productId: data.productId,
        productName: productData.name,
        productSku: productData.sku,
        quantityChange: data.quantityChange,
        newStockLevel: newStock,
        movementType: data.movementType,
        timestamp: Timestamp.now(),
        referenceId: data.referenceId,
      };
      this.stockMovementService.addMovement(transaction, movementLog);

      // Step 2: Update the product's stock level
      transaction.update(productDocRef, { currentStock: newStock });
    });
  }
}
