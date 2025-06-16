import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductionOrder } from '@models/production-order.model';
import { Observable } from 'rxjs';
import { ProductionOrderService } from '@app/production-orders/production-order.service';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-production-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './production-order-list.component.html',
  styleUrl: './production-order-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionOrderListComponent {
  private service = inject(ProductionOrderService);
  private snackBar = inject(MatSnackBar);

  orders$: Observable<ProductionOrder[]> = this.service.getProductionOrders();
  displayedColumns: string[] = [
    'productName',
    'quantityToProduce',
    'creationDate',
    'startDate',
    'completionDate',
    'status',
    'actions',
  ];

  startOrder(order: ProductionOrder): void {
    this.service.startProductionOrder(order.id)
      .then(() => this.snackBar.open('Ordem de produção iniciada!', 'Fechar', { duration: 3000 }))
      .catch((err: Error) => this.snackBar.open(`Erro: ${err.message}`, 'Fechar', { duration: 5000 }));
  }

  finishOrder(order: ProductionOrder): void {
    this.service.finishProductionOrder(order.id)
      .then(() => this.snackBar.open('Ordem de produção finalizada!', 'Fechar', { duration: 3000 }))
      .catch((err: Error) => this.snackBar.open(`Erro: ${err.message}`, 'Fechar', { duration: 5000 }));
  }
}
