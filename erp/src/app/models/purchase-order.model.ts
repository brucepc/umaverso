import { Timestamp } from '@angular/fire/firestore';

export interface PurchaseOrderItem {
  productId: string;
  // Denormalized fields for easier display in lists
  productName: string;
  productSku: string;

  quantity: number;
  unitCost: number;
}

export type PurchaseOrderStatus = 'OPEN' | 'APPROVED' | 'RECEIVED' | 'CANCELED';

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  // Denormalized field for easier display
  supplierName: string;

  issueDate: Timestamp;
  status: PurchaseOrderStatus;
  items: PurchaseOrderItem[];
  totalValue: number;
} 