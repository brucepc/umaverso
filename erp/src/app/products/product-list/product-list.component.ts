import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

import { Product } from '@models/product.model';
import { ImagePreviewDialogComponent } from '../image-preview-dialog/image-preview-dialog.component';
import { ProductStockHistoryComponent } from '../product-stock-history/product-stock-history.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    MatCardModule,
  ],
  host: {
    class: 'page-list',
  },
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  products$: Observable<Product[]> = this.productService.getProducts();
  displayedColumns: string[] = [
    'mainImageUrl',
    'sku',
    'name',
    'technicalDifficulty',
    'currentStock',
    'isDivisible',
    'averageCost',
    'priceRange',
    'isActive',
    'actions',
  ];

  addProduct(): void {
    this.router.navigate(['/products/new']);
  }

  editProduct(product: Product): void {
    this.router.navigate(['/products/edit', product.id]);
  }

  toggleProductStatus(product: Product): void {
    this.productService.toggleIsActive(product).then(() => {
      this.snackBar.open(
        `Artigo ${product.isActive ? 'ativado' : 'desativado'} com sucesso.`,
        'Fechar',
        { duration: 3000 }
      );
    });
  }

  showLargeImage(imageUrl: string, product: Product): void {
    if (!imageUrl || imageUrl.includes('placehold.co')) return; // Não abre para imagens placeholder
    this.dialog.open(ImagePreviewDialogComponent, {
      data: { imageUrl, product },
      panelClass: 'image-preview-dialog',
    });
  }

  viewStockHistory(product: Product): void {
    this.dialog.open(ProductStockHistoryComponent, {
      minWidth: 800,
      data: { product: product },
    });
  }
}
