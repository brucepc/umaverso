import { Timestamp } from "@angular/fire/firestore";
import { OrderItem } from "./order-item.model";

export interface SalesOrder {
  id: string;
  code: string; 
  customerId: string;
  customerName: string;
  emissionDate: Timestamp;
  status: 'DRAFT' | 'INVOICED' | 'CANCELED';
  items: OrderItem[];
  total: number;
} 