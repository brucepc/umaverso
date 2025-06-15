import { Timestamp } from "@angular/fire/firestore";

export interface SalesOrderItem {
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SalesOrder {
  id: string;
  customerId: string;
  customerName: string; // Denormalized
  customerDocument: string; // Denormalized
  issueDate: Timestamp;
  totalValue: number;
  status: 'DRAFT' | 'CONFIRMED' | 'CANCELED' | 'INVOICED';
  items: SalesOrderItem[];
} 