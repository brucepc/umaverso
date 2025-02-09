import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedusaService } from '../../services/medusa.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private medusaService: MedusaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadProduct(params['id']);
    });
  }

  private loadProduct(id: string): void {
    this.medusaService.getProduct(id).subscribe({
      next: (response) => {
        this.product = response.product;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading product details. Please try again later.';
        this.loading = false;
        console.error('Error fetching product:', error);
      }
    });
  }
} 