import { Timestamp } from "@angular/fire/firestore";

export enum StockMovementType {
  PURCHASE_RECEIPT = 'Entrada (Compra)',
  SALE_DISPATCH = 'Saída (Venda)',
  ADJUSTMENT_IN = 'Ajuste (Entrada)',
  ADJUSTMENT_OUT = 'Ajuste (Saída)',
  INITIAL_STOCK = 'Stock Inicial',
  PRODUCTION_CONSUMPTION = 'Consumo (Produção)',
  PRODUCTION_OUTPUT = 'Entrada (Produção)',
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string; // Denormalized for easy display
  productSku: string;  // Denormalized for easy display
  quantityChange: number; // Positive for additions, negative for subtractions
  newStockLevel: number;
  movementType: StockMovementType;
  timestamp: Timestamp;
  referenceId?: string; // e.g., purchaseOrderId, salesOrderId, etc.
} 