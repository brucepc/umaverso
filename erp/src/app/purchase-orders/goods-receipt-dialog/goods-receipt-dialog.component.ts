import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PurchaseOrder, PurchaseOrderStatus } from '@models/purchase-order.model';
import { StockMovementType } from '@models/stock-movement.model';
import { ProductService } from '../../products/product.service';
import { PurchaseOrderService } from '../purchase-order.service';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-goods-receipt-dialog',
  templateUrl: './goods-receipt-dialog.component.html',
  styleUrls: ['./goods-receipt-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class GoodsReceiptDialogComponent {
  private productService = inject(ProductService);
  private purchaseOrderService = inject(PurchaseOrderService);
  private snackBar = inject(MatSnackBar);
  isProcessing = false;

  constructor(
    public dialogRef: MatDialogRef<GoodsReceiptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public order: PurchaseOrder
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  async onConfirmReceipt(): Promise<void> {
    this.isProcessing = true;
    try {
      // Step 1: Update stock
      const stockUpdatePromises = this.order.items.map((item) => {
        const stockUpdateData = {
          productId: item.productId,
          quantityChange: item.quantity,
          movementType: StockMovementType.PURCHASE_RECEIPT,
          referenceId: this.order.id,
        };
        return this.productService.updateStock(stockUpdateData);
      });
      await Promise.all(stockUpdatePromises);

      // Step 2: Update PO status
      await this.purchaseOrderService.updatePurchaseOrderStatus(
        this.order.id,
        PurchaseOrderStatus.RECEIVED
      );

      this.snackBar.open(
        'Pedido recebido e stock atualizado com sucesso!',
        'Fechar',
        { duration: 3000 }
      );
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error receiving purchase order:', error);
      this.snackBar.open(
        'Falha ao receber o pedido. Verifique o console para mais detalhes.',
        'Fechar',
        { duration: 5000 }
      );
      this.dialogRef.close(false);
    } finally {
      this.isProcessing = false;
    }
  }
}
