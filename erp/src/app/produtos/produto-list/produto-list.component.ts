import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProdutoFormDialogComponent } from '../produto-form-dialog/produto-form-dialog.component';
import { Produto } from '@models/produto.model';
import { ProductService } from '../product.service';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.scss'
})
export class ProdutoListComponent implements OnInit {
  displayedColumns: string[] = ['sku', 'name', 'productType', 'salePrice', 'currentStock', 'isActive', 'acoes'];
  products$: Observable<Produto[]> = EMPTY;
  
  constructor(
    public dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProdutoFormDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { id, ...newProductData } = result;
        const newProduct: Omit<Produto, 'id'> = {
          ...newProductData,
          currentStock: 0,
          isActive: true,
        };
        this.productService.addProduct(newProduct);
      }
    });
  }

  openEditDialog(produto: Produto): void {
    const dialogRef = this.dialog.open(ProdutoFormDialogComponent, {
      width: '600px',
      data: produto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(result);
      }
    });
  }

  toggleIsActive(produto: Produto): void {
    this.productService.toggleIsActive(produto);
  }
}
