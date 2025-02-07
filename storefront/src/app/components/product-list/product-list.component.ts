import { Component, OnInit } from '@angular/core';
import { MedusaService } from '../../services/medusa.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private medusaService: MedusaService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.medusaService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response.products;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading products. Please try again later.';
        this.loading = false;
        console.error('Error fetching products:', error);
      }
    });
  }
}