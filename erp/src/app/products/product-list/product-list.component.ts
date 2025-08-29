import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Product } from '@models/product.model';
import { ProductType } from '@models/product-type.enum';
import { ImagePreviewDialogComponent } from '../image-preview-dialog/image-preview-dialog.component';
import { ProductStockHistoryComponent } from '../product-stock-history/product-stock-history.component';
import { ProductService } from '../product.service';
import { GeneralSettingsService } from '../../core/general-settings.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
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
  private generalSettingsService = inject(GeneralSettingsService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  // Controle do filtro por tipo de produto
  productTypeFilter = new FormControl('ALL');

  // Lista de produtos filtrada e enriquecida com preços
  products$: Observable<Product[]> = combineLatest([
    this.productService.getProducts(),
    this.productTypeFilter.valueChanges.pipe(startWith('ALL'))
  ]).pipe(
    map(([products, selectedType]) => {
      // Primeiro filtrar por tipo
      const filteredProducts = selectedType === 'ALL' 
        ? products 
        : products.filter(product => product.productType === selectedType);
      
      // Depois enriquecer com preços
      return filteredProducts.map(product => this.enrichProductWithPrices(product));
    })
  );

  displayedColumns: string[] = [
    'mainImageUrl',
    'sku',
    'name',
    'productType',
    'technicalDifficulty',
    'currentStock',
    'isDivisible',
    'averageCost',
    'calculatedMinPrice',
    'calculatedRecommendedPrice',
    'minProfitAmount',
    'isActive',
    'actions',
  ];

  // Opções do filtro de tipo de produto
  productTypeOptions = [
    { value: 'ALL', label: 'Todos os Produtos' },
    { value: ProductType.MateriaPrima, label: 'Matéria-Prima' },
    { value: ProductType.FabricoProprio, label: 'Fabrico Próprio' },
    { value: ProductType.Revenda, label: 'Revenda' }
  ];

  /**
   * Enriquece um produto com os preços calculados baseados nas regras configuráveis
   * Apenas calcula preços para produtos de REVENDA e FABRICO_PROPRIO
   */
  private enrichProductWithPrices(product: Product): Product {
    // Só calcular preços para produtos que são vendidos (não matérias-primas)
    const shouldCalculatePrices = product.productType === ProductType.Revenda || 
                                 product.productType === ProductType.FabricoProprio;
    
    if (shouldCalculatePrices) {
      const priceCalculation = this.generalSettingsService.calculatePrices(product.averageCost);
      
      return {
        ...product,
        calculatedMinPrice: priceCalculation.minSalePrice,
        calculatedRecommendedPrice: priceCalculation.recommendedSalePrice,
        minProfitAmount: priceCalculation.minProfitAmount,
        recommendedProfitAmount: priceCalculation.recommendedProfitAmount
      };
    }
    
    // Para matérias-primas, retornar sem cálculos de preço
    return {
      ...product,
      calculatedMinPrice: undefined,
      calculatedRecommendedPrice: undefined,
      minProfitAmount: undefined,
      recommendedProfitAmount: undefined
    };
  }

  /**
   * Retorna o label traduzido para o tipo de produto
   */
  getProductTypeLabel(productType: string): string {
    switch (productType) {
      case ProductType.MateriaPrima:
        return 'Matéria-Prima';
      case ProductType.FabricoProprio:
        return 'Fabrico Próprio';
      case ProductType.Revenda:
        return 'Revenda';
      default:
        return productType;
    }
  }

  /**
   * Reseta o filtro para mostrar todos os produtos
   */
  clearFilter(): void {
    this.productTypeFilter.setValue('ALL');
  }

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
