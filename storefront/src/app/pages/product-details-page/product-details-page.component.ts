import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { MainMenuViewportComponent } from '../../viewports/main-menu-viewport/main-menu-viewport.component';
import { MedusaService } from '../../services/medusa.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    CommonModule,
    ProductDetailsComponent,
    MainMenuViewportComponent,
    BreadcrumbComponent
  ],
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  product = signal<any>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  category = signal<any>(null);
  productHandle = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private medusaService: MedusaService
  ) {
    this.route.params.subscribe(params => {
      this.productHandle.set(params['handle']);
    });

    effect(() => {
      const handle = this.productHandle();
      if (handle) {
        this.loadProduct(handle);
      }
    });
  }

  ngOnInit(): void {
  }

  private loadProduct(handle: string): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.medusaService.getProductByHandle(handle, { expand: 'categories' }).subscribe({
      next: (response) => {
        this.product.set(response.product);
        if (response.product.categories?.length > 0) {
          this.category.set(response.product.categories[0]);
        }
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Error loading product details. Please try again later.');
        this.loading.set(false);
        console.error('Error fetching product:', error);
      }
    });
  }
} 