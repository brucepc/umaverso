import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, runTransaction, DocumentReference, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductionOrder } from '@models/production-order.model';
import { Product } from '@models/product.model';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductionOrderService {
  private firestore: Firestore = inject(Firestore);
  private ordersCollection = collection(this.firestore, 'productionOrders');
  private productsCollection = collection(this.firestore, 'products');

  getProductionOrders(): Observable<ProductionOrder[]> {
    return collectionData(this.ordersCollection, { idField: 'id' }) as Observable<ProductionOrder[]>;
  }

  addProductionOrder(order: Omit<ProductionOrder, 'id'>) {
    return addDoc(this.ordersCollection, order);
  }

  updateProductionOrder(order: ProductionOrder) {
    const orderDocRef = doc(this.firestore, `productionOrders/${order.id}`);
    return updateDoc(orderDocRef, { ...order });
  }

  async startProductionOrder(order: ProductionOrder): Promise<void> {
    return runTransaction(this.firestore, async (transaction) => {
      const finishedProductRef = doc(this.productsCollection, order.productId) as DocumentReference<Product>;
      const finishedProductSnap = await transaction.get(finishedProductRef);
      if (!finishedProductSnap.exists() || !finishedProductSnap.data().bom) {
        throw new Error('Produto acabado ou sua Ficha Técnica não encontrados.');
      }
      const bom = finishedProductSnap.data().bom!;

      const materialChecks = bom.map(async (item) => {
        const materialRef = doc(this.productsCollection, item.productId) as DocumentReference<Product>;
        const materialSnap = await transaction.get(materialRef);
        if (!materialSnap.exists()) { throw new Error(`Matéria-prima com ID ${item.productId} não encontrada.`); }
        const materialData = materialSnap.data();
        const requiredStock = item.quantity * order.quantityToProduce;
        if (materialData.currentStock < requiredStock) {
          throw new Error(`Stock insuficiente para ${materialData.name}. Necessário: ${requiredStock}, Disponível: ${materialData.currentStock}.`);
        }
        return { ref: materialRef, data: materialData, required: requiredStock };
      });
      const materials = await Promise.all(materialChecks);

      let totalCost = 0;
      materials.forEach(({ ref, data, required }) => {
        const newStock = data.currentStock - required;
        totalCost += (data.averageCost * required);
        transaction.update(ref, { currentStock: newStock });
      });

      const orderRef = doc(this.ordersCollection, order.id);
      transaction.update(orderRef, { status: 'Em Produção', startDate: Timestamp.now(), totalCost: totalCost });
    });
  }

  async completeProductionOrder(order: ProductionOrder): Promise<void> {
    return runTransaction(this.firestore, async (transaction) => {
      const finishedProductRef = doc(this.productsCollection, order.productId) as DocumentReference<Product>;
      const finishedProductSnap = await transaction.get(finishedProductRef);
      if (!finishedProductSnap.exists()) {
        throw new Error('Produto acabado não encontrado para finalizar a ordem.');
      }

      const productData = finishedProductSnap.data();
      const newStock = productData.currentStock + order.quantityToProduce;
      
      // Handle case where totalCost might be null/undefined for some reason
      const productionCost = order.totalCost ?? 0;
      
      const newAverageCost = ((productData.currentStock * productData.averageCost) + productionCost) / newStock;
      
      transaction.update(finishedProductRef, {
        currentStock: newStock,
        averageCost: newAverageCost
      });

      const orderRef = doc(this.ordersCollection, order.id);
      transaction.update(orderRef, {
        status: 'Finalizada',
        completionDate: Timestamp.now()
      });
    });
  }

  // Future methods for business logic (start, complete order) will go here
} 