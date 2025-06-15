import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { Product } from '@models/product.model';
import { ProductService } from '../product.service';
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog.component';
import { ProductStockHistoryComponent } from '../product-stock-history/product-stock-history.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  products$: Observable<Product[]> = this.productService.getProducts();
  displayedColumns: string[] = ['sku', 'name', 'currentStock', 'unitOfMeasure', 'averageCost', 'salePrice', 'isActive', 'actions'];

  addProduct(): void {
    this.dialog.open(ProductFormDialogComponent, {
      width: '450px',
      disableClose: true
    });
  }
  
  editProduct(product: Product): void {
    this.dialog.open(ProductFormDialogComponent, {
      width: '450px',
      disableClose: true,
      data: product
    });
  }

  toggleProductStatus(product: Product): void {
    this.productService.toggleIsActive(product).then(() => {
      this.snackBar.open(`Produto ${product.isActive ? 'ativado' : 'desativado'} com sucesso.`, 'Fechar', { duration: 3000});
    });
  }

  viewStockHistory(product: Product): void {
    this.dialog.open(ProductStockHistoryComponent, {
      width: '750px',
      data: { product: product }
    });
  }
} 