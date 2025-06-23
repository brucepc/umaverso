export interface OrderItem {
  productId: string;
  productName: string; // Denormalized
  productSku?: string; // Denormalized for purchase orders
  quantity: number;
  unitPrice?: number; // For sales orders
  unitCost?: number; // For purchase orders
  totalPrice: number;
  freightCost?: number;
  supplierId?: string;
  supplierName?: string;
} 