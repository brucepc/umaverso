import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { PurchaseOrder } from '@models/purchase-order.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GoodsReceiptDialogComponent } from '../goods-receipt-dialog/goods-receipt-dialog.component';
import { PurchaseOrderService } from '../purchase-order.service';
import { PurchaseOrderStatusPipe } from '../purchase-order-status.pipe';

@Component({
  selector: 'app-purchase-order-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    PurchaseOrderStatusPipe,
  ],
  host: {
    class: 'page-list'
  },
  templateUrl: './purchase-order-list.component.html',
  styleUrl: './purchase-order-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseOrderListComponent implements OnInit {
  private purchaseOrderService = inject(PurchaseOrderService);
  private dialog = inject(MatDialog);
  public router = inject(Router);
  private snackBar = inject(MatSnackBar);

  private purchaseOrders: PurchaseOrder[] = [];
  purchaseOrders$: Observable<PurchaseOrder[]> = this.purchaseOrderService.getPurchaseOrders().pipe(
    tap(orders => this.purchaseOrders = orders)
  );
  displayedColumns: string[] = ['emissionDate', 'code', 'supplierName', 'total', 'status', 'actions'];

  constructor() {}

  ngOnInit(): void {
    // ... ngOnInit logic
  }

  navigateToForm(): void {
    this.router.navigate(['/purchase-orders/new']);
  }

  cancelOrder(order: PurchaseOrder): void {
    if (confirm('Tem certeza que deseja cancelar este pedido?')) {
      this.purchaseOrderService.updatePurchaseOrderStatus(order.id, 'CANCELED')
        .then(() => {
          this.snackBar.open('Pedido cancelado com sucesso!', 'Fechar', { duration: 3000 });
        })
        .catch((err: any) => {
          this.snackBar.open('Erro ao cancelar o pedido.', 'Fechar', { duration: 3000 });
          console.error(err);
        });
    }
  }

  openReceiptDialog(order: PurchaseOrder): void {
    this.dialog.open(GoodsReceiptDialogComponent, {
      minWidth: 800,
      data: order
    });
  }
} 