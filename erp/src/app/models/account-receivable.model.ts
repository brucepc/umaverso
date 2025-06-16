import { Timestamp } from '@angular/fire/firestore';

export interface AccountReceivable {
  id: string;
  customerId: string;
  customerName: string; // Denormalized for display
  salesOrderId: string;
  salesOrderCode: string; // Denormalized for display
  issueDate: Timestamp;
  dueDate: Timestamp;
  totalAmount: number;
  status: 'Aberta' | 'Liquidada';
  settlementDate?: Timestamp;
} 