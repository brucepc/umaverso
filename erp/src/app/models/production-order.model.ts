import { Timestamp } from '@angular/fire/firestore';

export interface ProductionOrder {
  id: string;
  productId: string;
  productName?: string; // Denormalized for display
  quantityToProduce: number;
  creationDate: Timestamp;
  startDate?: Timestamp;
  completionDate?: Timestamp;
  status: 'Pendente' | 'Em Produção' | 'Finalizada' | 'Cancelada';
  totalCost?: number;
} 