import { CommonModule, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  categories = signal<any[]>([]);

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    if (isPlatformServer(this.platformId)) {
      // Server-side: Get categories from res.locals
      this.categories = (global as any).res.locals.categories || [];
    } else {
      this.categoryService.getCategories().subscribe({
        next: (response) => {
          this.categories.set(
            response.product_categories.filter((cat: any) => !cat.parent_category_id)
          );
        },
        error: (error) => {
          console.error('Error loading categories:', error);
        }
      });
    }
  }

  navigateToCategory(categoryId: string): void {
    this.router.navigate(['/category', categoryId]);
  }
} 