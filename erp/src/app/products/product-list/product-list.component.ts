import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
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
import { ImagePreviewDialogComponent } from '../image-preview-dialog/image-preview-dialog.component';

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
  providers: [ProductFormDialogComponent],
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

  products$: Observable<Product[]> = this.productService.getProducts();
  displayedColumns: string[] = [
    'mainImageUrl',
    'sku',
    'name',
    'currentStock',
    'unitOfMeasure',
    'averageCost',
    'salePrice',
    'isActive',
    'actions',
  ];

  addProduct(): void {
    this.dialog.open(ProductFormDialogComponent, {
      minWidth: 800,
      disableClose: true,
    });
  }

  editProduct(product: Product): void {
    this.dialog.open(ProductFormDialogComponent, {
      minWidth: 800,
      disableClose: true,
      data: product,
    });
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
