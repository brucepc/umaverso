import { Injectable } from '@angular/core';
import Medusa from "@medusajs/medusa-js"
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedusaService {
  private medusaClient: Medusa;
  private publishableApiKey = 'pk_12bfbd5319d6deae9cb8ec3d27b9acc61349c2d79dc5a0f2fbf02106276e7794'; // Replace with your actual API key

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

  getProducts(): Observable<any> {
    return from(this.medusaClient.products.list());
  }

  getProduct(id: string): Observable<any> {
    return from(this.medusaClient.products.retrieve(id));
  }
}
