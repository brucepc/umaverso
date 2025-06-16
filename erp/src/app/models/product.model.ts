import { ProductType } from "./product-type.enum";

export interface BomItem {
  productId: string;
  productName?: string; // Denormalized for display
  quantity: number;
}

export interface Product {
  id: string;
  categoryId: string;
  sku: string;
  name: string;
  productType: ProductType;
  unitOfMeasure: string;
  currentStock: number;
  averageCost: number;
  salePrice?: number;
  isActive: boolean;
  bom?: BomItem[]; // Bill of Materials for FABRICO_PROPRIO
} 