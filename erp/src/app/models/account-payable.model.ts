import { Timestamp } from '@angular/fire/firestore';

export interface AccountPayable {
  id: string;
  supplierId: string;
  supplierName: string; // Denormalized for display
  purchaseOrderId: string;
  invoiceNumber?: string; // Optional
  issueDate: Timestamp;
  dueDate: Timestamp;
  totalAmount: number;
  status: 'Aberta' | 'Aprovada' | 'Rejeitada' | 'Paga' | 'Vencida';
  settlementDate?: Timestamp;
  installments: number; // Number of installments
}