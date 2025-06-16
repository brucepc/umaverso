import { Timestamp } from '@angular/fire/firestore';

export interface AccountPayable {
  id: string;
  supplierId: string;
  supplierName: string; // Denormalized for display
  purchaseOrderId: string;
  purchaseOrderCode: string; // Denormalized for display
  issueDate: Timestamp;
  dueDate: Timestamp;
  totalAmount: number;
  status: 'Aberta' | 'Liquidada';
  settlementDate?: Timestamp;
}