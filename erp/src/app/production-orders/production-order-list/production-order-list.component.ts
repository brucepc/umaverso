import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ProductionOrder } from '@models/production-order.model';
import { Observable } from 'rxjs';
import { ProductionOrderService } from '../production-order.service';

@Component({
  selector: 'app-production-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  host: {
    class: 'page-list'
  },
  templateUrl: './production-order-list.component.html',
  styleUrls: ['./production-order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionOrderListComponent {
  private productionOrderService = inject(ProductionOrderService);
  private snackBar = inject(MatSnackBar);

  orders$: Observable<ProductionOrder[]>;
  displayedColumns: string[] = ['creationDate', 'id', 'productName', 'quantityToProduce', 'status', 'actions'];

  constructor() {
    this.orders$ = this.productionOrderService.getProductionOrders();
  }

  async startOrder(order: ProductionOrder) {
    if (!order.id) return;
    try {
      await this.productionOrderService.startProductionOrder(order.id);
      this.snackBar.open(`Ordem de Produção ${order.id} iniciada.`, 'Fechar', { duration: 3000 });
    } catch (error: any) {
      console.error(error);
      this.snackBar.open(error.message, 'Fechar', { duration: 5000 });
    }
  }

  async finishOrder(order: ProductionOrder) {
    if (!order.id) return;
    try {
      await this.productionOrderService.finishProductionOrder(order.id);
      this.snackBar.open(`Ordem de Produção ${order.id} finalizada.`, 'Fechar', { duration: 3000 });
    } catch (error: any) {
      console.error(error);
      this.snackBar.open(error.message, 'Fechar', { duration: 5000 });
    }
  }
} 