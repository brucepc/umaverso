import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MedusaService} from '../../services/medusa.service';
import {ProductCardComponent} from '../product-card/product-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {catchError, finalize} from 'rxjs';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    MatProgressSpinnerModule,
    MatGridListModule,
    BreadcrumbComponent
  ],
  providers: [MedusaService, CategoryService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products = signal<any[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  currentCategory = signal<any>(null);

  constructor(
    private medusaService: MedusaService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params['handle']) {
        this.loadCategory(params['handle']);
      } else {
        this.loadProducts();
      }
    });
  }

  private loadCategory(handle: string): void {
    this.categoryService.getCategoryByHandle(handle).subscribe({
      next: (category) => {
        this.currentCategory.set(category);
        this.loadProducts(category.id);
      },
      error: (error) => {
        console.error('Error loading category:', error);
        this.error.set('Error loading category. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  private loadProducts(categoryId?: string): void {
    this.loading.set(true);
    this.error.set(null);

    const options: any = {
      limit: 100
    };

    if (categoryId) {
      options.category_id = [categoryId];
    }
    options.fields = `*variants.calculated_price`;

    this.medusaService.getProducts(options).pipe(
      catchError(err => {
        this.error.set('Error loading products. Please try again later.');
        console.error('Error fetching products:', err);
        return [];
      }),
      finalize(() => {
        this.loading.set(false);
      })
    ).subscribe(response => {
      this.products.set(response.products || []);
    });
  }
}
