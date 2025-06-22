import { Pipe, PipeTransform } from '@angular/core';
import { PurchaseOrderStatus } from '@models/purchase-order.model';

@Pipe({
  name: 'purchaseOrderStatus',
  standalone: true,
})
export class PurchaseOrderStatusPipe implements PipeTransform {
  transform(value: PurchaseOrderStatus): string {
    switch (value) {
      case 'PENDING_APPROVAL':
        return 'Pendente de Aprovação';
      case 'APPROVED':
        return 'Aprovado';
      case 'RECEIVED':
        return 'Recebido';
      case 'CANCELED':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  }
} 