import { ProductType } from "./product-type.enum";

export interface BomItem {
  productId: string;
  productName?: string; // Denormalized for display
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  categoryName?: string;
  productType: ProductType;
  unitOfMeasure: string;
  currentStock?: number;
  averageCost?: number;
  salePrice: number;
  isActive: boolean;
  weight?: number; // in kg
  size?: string; // e.g., "10x20x5 cm"
  mainImageUrl?: string;
  imageUrls?: string[];
  bom?: BomItem[]; // Bill of Materials for FABRICO_PROPRIO
} 