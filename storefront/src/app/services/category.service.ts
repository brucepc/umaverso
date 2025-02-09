import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MedusaService } from './medusa.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private medusaService: MedusaService) {}

  getCategories(): Observable<any> {
    return from(this.medusaService.client.productCategories.list({ include_descendants_tree: true }));
  }

  getCategory(id: string): Observable<any> {
    return from(this.medusaService.client.productCategories.retrieve(id));
  }

  getCategoryByHandle(handle: string): Observable<any> {
    return from(
      this.medusaService.client.productCategories.list({ handle })
        .then(response => {
          if (response.product_categories.length === 0) {
            throw new Error(`Category with handle "${handle}" not found`);
          }
          return response.product_categories[0];
        })
    );
  }
} 