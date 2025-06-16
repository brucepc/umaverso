import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SalesOrder } from '@models/sales-order.model';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-sales-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  host: {
    class: 'page-list'
  },
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.scss']
})
export class SalesOrderListComponent {
  private salesOrderService = inject(SalesOrderService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  salesOrders$: Observable<SalesOrder[]> = this.salesOrderService.getSalesOrders();
  displayedColumns: string[] = ['code', 'customerName', 'emissionDate', 'total', 'status', 'actions'];

  navigateToForm(): void {
    this.router.navigate(['/sales-orders/new']);
  }

  invoiceOrder(order: SalesOrder): void {
    if (confirm(`Tem certeza que deseja faturar o pedido ${order.id}? Esta ação dará baixa no estoque e não poderá ser desfeita.`)) {
      this.salesOrderService.processInvoice(order).then(() => {
        this.snackBar.open('Pedido faturado com sucesso!', 'Fechar', { duration: 3000 });
      }).catch((err: any) => {
        console.error('Error invoicing order:', err);
        this.snackBar.open('Erro ao faturar o pedido.', 'Fechar', { duration: 5000 });
      });
    }
  }
}
