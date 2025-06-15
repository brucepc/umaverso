import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { ProductionOrder } from '@models/production-order.model';
import { Observable } from 'rxjs';
import { ProductionOrderService } from './production-order.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-production-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  templateUrl: './production-order-list.component.html',
  styleUrl: './production-order-list.component.scss'
})
export class ProductionOrderListComponent {
  private productionOrderService = inject(ProductionOrderService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  productionOrders$: Observable<ProductionOrder[]> = this.productionOrderService.getProductionOrders();
  displayedColumns: string[] = ['productName', 'quantityToProduce', 'status', 'creationDate', 'actions'];
  
  navigateToForm(): void {
    this.router.navigate(['/production-orders/new']);
  }

  navigateToEdit(id: string): void {
    this.router.navigate(['/production-orders/edit', id]);
  }

  startProduction(order: ProductionOrder): void {
    if (!confirm(`Tem a certeza que deseja iniciar a produção da ordem para ${order.quantityToProduce} unidade(s) de ${order.productName}? Esta ação abaterá o stock das matérias-primas.`)) {
      return;
    }
    
    this.productionOrderService.startProductionOrder(order)
      .then(() => {
        this.snackBar.open('Ordem de produção iniciada com sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch(err => {
        this.snackBar.open(`Erro ao iniciar produção: ${err.message}`, 'Fechar', { duration: 5000 });
      });
  }
  
  completeProduction(order: ProductionOrder): void {
    if (!confirm(`Tem a certeza que deseja finalizar a produção da ordem para ${order.productName}? Esta ação adicionará o produto acabado ao stock.`)) {
      return;
    }

    this.productionOrderService.completeProductionOrder(order)
      .then(() => {
        this.snackBar.open('Ordem de produção finalizada com sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch(err => {
        this.snackBar.open(`Erro ao finalizar produção: ${err.message}`, 'Fechar', { duration: 5000 });
      });
  }
}
