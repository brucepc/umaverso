import {Injectable} from '@angular/core';
import Medusa from "@medusajs/medusa-js"
import {from, Observable} from 'rxjs';
import {StoreGetProductsParams} from '../interfaces/store-params.interface';


@Injectable({
  providedIn: 'root'
})
export class MedusaService {
  private medusaClient: Medusa;
  publishableApiKey = 'pk_12bfbd5319d6deae9cb8ec3d27b9acc61349c2d79dc5a0f2fbf02106276e7794'; // Replace with your actual API key

  constructor() {
    this.medusaClient = new Medusa({
      baseUrl: 'http://localhost:9000',
      maxRetries: 3,
      publishableApiKey: this.publishableApiKey
    });
  }

  // Add getter for the medusa client
  get client(): Medusa {
    return this.medusaClient;
  }

  list() {
    return from(this.medusaClient.products.list());
  }

getProducts(options?: StoreGetProductsParams): Observable<any> {
    return from(this.medusaClient.products.list(options as any));
  }

  getProduct(id: string, query?: Record<string, any>): Observable<any> {
    return from(this.medusaClient.products.retrieve(id, query));
  }

  getProductByHandle(handle: string, query?: Record<string, any>): Observable<any> {
    return from(
      this.medusaClient.products.list({handle})
        .then(response => {
          if (response.products.length === 0) {
            throw new Error(`Product with handle "${handle}" not found`);
          }
          return {product: response.products[0]};
        })
    );
  }

  listCurrencies(): Observable<any> {
    return from(this.medusaClient.regions.list({expand: 'region.currency'}));
  }
}
