import { Timestamp } from '@angular/fire/firestore';
import { OrderItem } from './order-item.model';

export type PurchaseOrderStatus =
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'RECEIVED'
  | 'CANCELED';

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