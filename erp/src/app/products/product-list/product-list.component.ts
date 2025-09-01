import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    MatCheckboxModule,
  ],
  host: {
    class: 'page-list',
  },
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private generalSettingsService = inject(GeneralSettingsService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  private readonly columnsStorageKey = 'product-list-columns';

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

  // Definição das colunas disponíveis
  allColumns: { id: string; label: string; visible: boolean }[] = [
    { id: 'mainImageUrl', label: 'Imagem', visible: true },
    { id: 'sku', label: 'SKU', visible: true },
    { id: 'name', label: 'Nome', visible: true },
    { id: 'productType', label: 'Tipo', visible: true },
    { id: 'technicalDifficulty', label: 'Dificuldade', visible: false },
    { id: 'currentStock', label: 'Estoque', visible: true },
    { id: 'isDivisible', label: 'Divisível?', visible: false },
    { id: 'averageCost', label: 'Custo', visible: true },
    { id: 'calculatedMinPrice', label: 'PvP Mín.', visible: true },
    { id: 'calculatedRecommendedPrice', label: 'PvP Rec.', visible: true },
    { id: 'minProfitAmount', label: 'Lucro Mín.', visible: false },
    { id: 'isActive', label: 'Status', visible: true },
    { id: 'actions', label: 'Ações', visible: true },
  ];

  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.loadColumnPreferences();
    this.updateDisplayedColumns();
  }

  // Opções do filtro de tipo de produto
  productTypeOptions = [
    { value: 'ALL', label: 'Todos os Produtos' },
    { value: ProductType.MateriaPrima, label: 'Matéria-Prima' },
    { value: ProductType.FabricoProprio, label: 'Fabrico Próprio' },
    { value: ProductType.Revenda, label: 'Revenda' }
  ];

  /**
   * Alterna a visibilidade de uma coluna
   * @param column A coluna a ser alterada
   */
  toggleColumnVisibility(column: { id: string; label: string; visible: boolean }): void {
    column.visible = !column.visible;
    this.updateDisplayedColumns();
    this.saveColumnPreferences();
  }

  /**
   * Atualiza o array de colunas exibidas com base na visibilidade
   */
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.allColumns.filter(col => col.visible).map(col => col.id);
  }

  private saveColumnPreferences(): void {
    const columnPreferences = this.allColumns.map(col => ({ id: col.id, visible: col.visible }));
    localStorage.setItem(this.columnsStorageKey, JSON.stringify(columnPreferences));
  }

  private loadColumnPreferences(): void {
    const savedPreferences = localStorage.getItem(this.columnsStorageKey);
    if (savedPreferences) {
      const preferences: { id: string; visible: boolean }[] = JSON.parse(savedPreferences);
      this.allColumns.forEach(col => {
        const savedCol = preferences.find(p => p.id === col.id);
        if (savedCol) {
          col.visible = savedCol.visible;
        }
      });
    }
  }

  /**
   * Otimização para a renderização da tabela, evitando recarregamento de imagens
   */
  trackByProductId(index: number, product: Product): string {
    return product.id;
  }

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
