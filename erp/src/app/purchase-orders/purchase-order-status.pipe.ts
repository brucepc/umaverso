import { Pipe, PipeTransform } from '@angular/core';
import { PurchaseOrderStatus } from '@models/purchase-order.model';

@Pipe({
  name: 'purchaseOrderStatus',
  standalone: true,
})
export class PurchaseOrderStatusPipe implements PipeTransform {
  transform(value: PurchaseOrderStatus | undefined | null): string {
    if (!value) return '';

    switch (value) {
      case PurchaseOrderStatus.PENDING_APPROVAL:
        return 'Pendente de Aprovação';
      case PurchaseOrderStatus.APPROVED:
        return 'Aprovado';
      case PurchaseOrderStatus.RECEIVED:
        return 'Recebido';
      case PurchaseOrderStatus.CANCELED:
        return 'Cancelado';
      default:
        return value;
    }
  }
} 