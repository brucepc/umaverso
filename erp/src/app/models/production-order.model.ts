import { Timestamp } from '@angular/fire/firestore';
import { BomItem } from './product.model';

export enum ProductionOrderStatus {
  PENDING = 'Pendente',
  IN_PRODUCTION = 'Em Produção',
  COMPLETED = 'Finalizada',
  CANCELED = 'Cancelada',
}

export interface ProductionOrder {
  id: string;
  productId: string;
  productName?: string; // Denormalized for display
  quantityToProduce: number;
  creationDate: Timestamp;
  startDate?: Timestamp;
  completionDate?: Timestamp;
  status: ProductionOrderStatus;
  totalCost?: number;
  bom: BomItem[];
} 