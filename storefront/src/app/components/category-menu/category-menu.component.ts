import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.product_categories.filter((cat: any) => !cat.parent_category_id);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  navigateToCategory(categoryId: string): void {
    this.router.navigate(['/category', categoryId]);
  }
} 