import { Timestamp } from '@angular/fire/firestore';

export enum AccountPayableStatus {
  OPEN = 'Aberta',
  APPROVED = 'Aprovada',
  REJECTED = 'Rejeitada',
  PAID = 'Paga',
  OVERDUE = 'Vencida',
}

export interface AccountPayable {
  id: string;
  supplierId: string;
  supplierName: string; // Denormalized for display
  purchaseOrderId: string;
  invoiceNumber?: string; // Optional
  issueDate: Timestamp;
  dueDate: Timestamp;
  totalAmount: number;
  status: AccountPayableStatus;
  settlementDate?: Timestamp;
  installments: number; // Number of installments
}