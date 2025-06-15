import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StockMovement } from '@models/stock-movement.model';
import { StockMovementService } from '../../stock-movements/stock-movement.service';
import { Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '@models/product.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface DialogData {
  product: Product;
}

@Component({
  selector: 'app-product-stock-history',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-stock-history.component.html',
  styleUrls: ['./product-stock-history.component.scss']
})
export class ProductStockHistoryComponent {
  private stockMovementService = inject(StockMovementService);
  
  movements$: Observable<StockMovement[]>;
  displayedColumns: string[] = ['timestamp', 'movementType', 'quantityChange', 'newStockLevel', 'referenceId'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.movements$ = this.stockMovementService.getMovementsForProduct(data.product.id);
  }
}
