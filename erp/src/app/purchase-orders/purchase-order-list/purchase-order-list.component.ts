import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { PurchaseOrder } from '@models/purchase-order.model';
import { Observable } from 'rxjs';
import { PurchaseOrderService } from '../purchase-order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoodsReceiptDialogComponent } from '../goods-receipt-dialog/goods-receipt-dialog.component';
import { take, tap } from 'rxjs/operators';

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
  ],
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
  displayedColumns: string[] = ['id', 'supplierName', 'issueDate', 'totalValue', 'status', 'actions'];

  constructor() {}

  ngOnInit(): void {
    // ... ngOnInit logic
  }

  navigateToForm(): void {
    this.router.navigate(['/purchase-orders/new']);
  }

  cancelOrder(id: string): void {
    if (confirm('Tem certeza que deseja cancelar este pedido?')) {
      this.purchaseOrderService.updatePurchaseOrderStatus(id, 'CANCELED')
        .then(() => {
          this.snackBar.open('Pedido cancelado com sucesso!', 'Fechar', { duration: 3000 });
        })
        .catch((err: any) => {
          this.snackBar.open('Erro ao cancelar o pedido.', 'Fechar', { duration: 3000 });
          console.error(err);
        });
    }
  }

  receiveOrder(id: string): void {
    const orderToReceive = this.purchaseOrders.find(p => p.id === id);

    if (orderToReceive) {
      this.dialog.open(GoodsReceiptDialogComponent, {
        width: '500px',
        data: orderToReceive
      });
    } else {
      this.snackBar.open('Erro: Pedido de compra não encontrado.', 'Fechar', { duration: 3000 });
      console.error('Could not find purchase order with id:', id);
    }
  }
} 