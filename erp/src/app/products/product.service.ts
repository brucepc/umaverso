import {
  Injectable,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';
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
  getDoc,
} from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { Observable, from } from 'rxjs';
import { StockMovement } from '@models/stock-movement.model';
import { StockMovementService } from '../stock-movements/stock-movement.service';
import { ProductType } from '@models/product-type.enum';
import { GeneralSettingsService } from '../core/general-settings.service';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
  getStorage,
} from '@angular/fire/storage';
import { map, switchMap } from 'rxjs/operators';

interface StockUpdateData {
  productId: string;
  quantityChange: number;
  movementType: StockMovement['movementType'];
  referenceId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);
  private stockMovementService = inject(StockMovementService);
  private generalSettingsService = inject(GeneralSettingsService);
  private productsCollection = collection(this.firestore, 'products');
  private injector = inject(Injector);
  private collectionName = 'products';

  constructor() {}

  getProducts(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  getProductById(id: string): Observable<Product | undefined> {
    const productDocRef = doc(this.firestore, `products/${id}`);
    return from(getDoc(productDocRef)).pipe(
      map((docSnap) => (docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Product) : undefined))
    );
  }

  getRawMaterials(): Observable<Product[]> {
    const q = query(
      this.productsCollection,
      where('productType', '==', ProductType.MateriaPrima),
      where('isActive', '==', true)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  getFinishedGoods(): Observable<Product[]> {
    const q = query(
      this.productsCollection,
      where('productType', '==', ProductType.FabricoProprio),
      where('isActive', '==', true)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  getPotentialMasterProducts(): Observable<Product[]> {
    const q = query(this.productsCollection, where('masterProductId', '==', null));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  getVariantsForProduct(productId: string): Observable<Product[]> {
    const q = query(this.productsCollection, where('masterProductId', '==', productId));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  addProduct(product: Omit<Product, 'id'>): Promise<string> {
    return addDoc(this.productsCollection, product).then(
      (docRef) => docRef.id
    );
  }

  async updateProduct(product: Product) {
    const productDocRef = doc(this.firestore, `products/${product.id}`);
    const { id, ...dataToUpdate } = product;
    return updateDoc(productDocRef, dataToUpdate);
  }

  uploadProductImage(file: File): Observable<string> {
    const filePath = `products/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = from(uploadBytes(storageRef, file));
    return uploadTask.pipe(
      switchMap(result => from(getDownloadURL(result.ref)))
    );
  }

  toggleIsActive(product: Product) {
    const productDocRef = doc(this.firestore, `products/${product.id}`);
    return updateDoc(productDocRef, { isActive: !product.isActive });
  }

  /**
   * Calcula faixa de preços baseada nas regras de lucro configuradas
   * @param technicalDifficulty Dificuldade técnica (mantido para compatibilidade)
   * @param averageCost Custo médio do produto
   * @returns Faixa de preços calculada
   */
  calculatePriceRange(
    technicalDifficulty: number,
    averageCost: number
  ): { minSalePrice: number; maxSalePrice: number } {
    // Usar as regras configuráveis em vez de valores fixos
    const priceCalculation = this.generalSettingsService.calculatePrices(averageCost);
    
    return { 
      minSalePrice: priceCalculation.minSalePrice,
      maxSalePrice: priceCalculation.recommendedSalePrice 
    };
  }

  /**
   * Calcula preços detalhados baseado nas regras de lucro
   * @param averageCost Custo médio do produto
   * @returns Cálculo completo de preços
   */
  calculateDetailedPrices(averageCost: number) {
    return this.generalSettingsService.calculatePrices(averageCost);
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
