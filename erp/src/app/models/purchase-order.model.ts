import { Timestamp } from '@angular/fire/firestore';
import { OrderItem } from './order-item.model';

export type PurchaseOrderStatus = 'OPEN' | 'APPROVED' | 'RECEIVED' | 'CANCELED';

export interface PurchaseOrder {
  id: string;
  code: string;
  supplierId: string;
  supplierName: string;
  emissionDate: Timestamp;
  status: PurchaseOrderStatus;
  items: OrderItem[];
  total: number;
} 