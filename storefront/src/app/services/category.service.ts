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
} 