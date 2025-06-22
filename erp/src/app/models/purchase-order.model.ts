import { Timestamp } from '@angular/fire/firestore';
import { OrderItem } from './order-item.model';

export enum PurchaseOrderStatus {
  PENDING_APPROVAL = 'Pendente de Aprovação',
  APPROVED = 'Aprovado',
  RECEIVED = 'Recebido',
  CANCELED = 'Cancelado',
}

export interface PurchaseOrder {
  id: string;
  code: string;
  supplierId: string;
  supplierName: string;
  emissionDate: Timestamp;
  estimatedDeliveryDate: Timestamp;
  status: PurchaseOrderStatus;
  items: OrderItem[];
  total: number;
} 