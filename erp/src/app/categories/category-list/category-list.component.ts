import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, EMPTY } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoryService } from '../category.service';
import { CategoryFormDialogComponent } from '../category-form-dialog/category-form-dialog.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'prefix', 'actions'];
  categories$: Observable<Category[]> = EMPTY;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }

  openDialog(category?: Category): void {
    const dialogRef = this.dialog.open(CategoryFormDialogComponent, {
      width: '400px',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          // Edição
          this.categoryService.updateCategory(result);
        } else {
          // Criação
          const newCategory: Omit<Category, 'id'> = {
            name: result.name,
            prefix: result.prefix.toUpperCase(),
            productCount: 0
          };
          this.categoryService.addCategory(newCategory);
        }
      }
    });
  }
}
