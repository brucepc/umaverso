import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  runTransaction,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Product } from '@models/product.model';
import { ProductionOrder } from '@models/production-order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductionOrderService {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);
  private productionOrdersCollection = collection(this.firestore, 'productionOrders');
  private productsCollection = collection(this.firestore, 'products');

  getProductionOrders(): Observable<ProductionOrder[]> {
    return collectionData(this.productionOrdersCollection, { idField: 'id' }) as Observable<ProductionOrder[]>;
  }

  getProductionOrderById(id: string): Observable<ProductionOrder> {
    const poDoc = doc(this.firestore, `productionOrders/${id}`);
    return docData(poDoc, { idField: 'id' }) as Observable<ProductionOrder>;
  }

  async addProductionOrder(order: Omit<ProductionOrder, 'id' | 'status' | 'creationDate' | 'startDate' | 'totalCost'>): Promise<any> {
    const newOrder: Omit<ProductionOrder, 'id'> = {
      ...order,
      status: 'Pendente',
      creationDate: Timestamp.now(),
    };
    return addDoc(this.productionOrdersCollection, newOrder);
  }

  async startProductionOrder(orderId: string): Promise<void> {
    const orderRef = doc(this.firestore, `productionOrders/${orderId}`);

    return runInInjectionContext(this.injector, () =>
      runTransaction(this.firestore, async (transaction) => {
        const orderDoc = await transaction.get(orderRef);
        if (!orderDoc.exists()) {
          throw new Error('Production order does not exist!');
        }

        const orderData = orderDoc.data() as ProductionOrder;
        if (orderData.status !== 'Pendente') {
          throw new Error('Apenas ordens PENDENTES podem ser iniciadas.');
        }
        
        const productToProduceRef = doc(this.firestore, `products/${orderData.productId}`);
        const productToProduceDoc = await transaction.get(productToProduceRef);
        const productData = productToProduceDoc.data() as Product;

        if(!productToProduceDoc.exists() || !productData.bom) {
          throw new Error("O produto a ser produzido não existe ou não tem Ficha Técnica (BOM).");
        }
        
        const bom = productData.bom as { productId: string; quantity: number }[];
        let totalCost = 0;
        const stockUpdates: {
          ref: any;
          newStock: number;
        }[] = [];

        for (const component of bom) {
          const componentRef = doc(this.productsCollection, component.productId);
          const componentDoc = await transaction.get(componentRef);
          
          if (!componentDoc.exists()) {
            throw new Error(`Component with ID ${component.productId} not found.`);
          }

          const componentData = componentDoc.data() as Product;
          const requiredQuantity = component.quantity * orderData.quantityToProduce;
          const currentStock = componentData.currentStock ?? 0;

          if (currentStock < requiredQuantity) {
            throw new Error(`Insufficient stock for component ${componentData.name}. Required: ${requiredQuantity}, Available: ${currentStock}`);
          }

          const newStock = currentStock - requiredQuantity;
          stockUpdates.push({ ref: componentRef, newStock: newStock });
          totalCost += (componentData.averageCost || 0) * requiredQuantity;
        }

        // Now, perform all writes
        for (const update of stockUpdates) {
          transaction.update(update.ref, { currentStock: update.newStock });
        }

        transaction.update(orderRef, { 
          status: 'Em Produção',
          startDate: serverTimestamp(),
          totalCost: totalCost
        });
      })
    );
  }

  async finishProductionOrder(orderId: string): Promise<void> {
    const orderRef = doc(this.firestore, `productionOrders/${orderId}`);

    return runInInjectionContext(this.injector, () =>
      runTransaction(this.firestore, async (transaction) => {
        const orderDoc = await transaction.get(orderRef);
        if (!orderDoc.exists()) {
          throw new Error('Production order does not exist!');
        }

        const orderData = orderDoc.data() as ProductionOrder;
         if (orderData.status !== 'Em Produção') {
          throw new Error('Apenas ordens EM PRODUÇÃO podem ser finalizadas.');
        }

        const productRef = doc(this.productsCollection, orderData.productId);
        const productDoc = await transaction.get(productRef);
        if (!productDoc.exists()) {
          throw new Error('Product not found!');
        }

        const productData = productDoc.data() as Product;
        const currentStock = productData.currentStock ?? 0;
        const currentAverageCost = productData.averageCost ?? 0;

        const newStock = currentStock + orderData.quantityToProduce;
        const newAverageCost = ((currentAverageCost * currentStock) + (orderData.totalCost || 0)) / newStock;

        transaction.update(productRef, {
          currentStock: newStock,
          averageCost: newAverageCost
        });

        transaction.update(orderRef, { 
          status: 'Finalizada',
          completionDate: serverTimestamp()
        });
      })
    );
  }
} 