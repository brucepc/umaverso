import { Timestamp } from "@angular/fire/firestore";

export interface StockMovement {
  id: string;
  productId: string;
  productName: string; // Denormalized for easy display
  productSku: string;  // Denormalized for easy display
  quantityChange: number; // Positive for additions, negative for subtractions
  newStockLevel: number;
  movementType: 'PURCHASE_RECEIPT' | 'SALE_DISPATCH' | 'ADJUSTMENT_IN' | 'ADJUSTMENT_OUT' | 'INITIAL_STOCK';
  timestamp: Timestamp;
  referenceId?: string; // e.g., purchaseOrderId, salesOrderId, etc.
} 