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
  description?: string;
  barcode?: string;
  unit?: string; // e.g., 'un', 'kg', 'm'
  categoryId: string;
  categoryName: string;
  productType: ProductType;
  isDivisible: boolean;
  ncm?: string;
  currentStock: number;
  lowStockThreshold?: number;
  averageCost: number;
  salePrice?: number; // Preço de venda final
  regularPrice?: number; // Preço "de" (antes do desconto)
  // Campos para os preços calculados com base nas regras (PvP = Preço de Venda ao Público)
  calculatedMinPrice?: number; // PvP mínimo (custo + lucro mínimo + IVA)
  calculatedRecommendedPrice?: number; // PvP recomendado (custo + lucro recomendado + IVA)
  minProfitAmount?: number; // Valor do lucro mínimo
  recommendedProfitAmount?: number; // Valor do lucro recomendado
  isActive: boolean;
  weight?: number; // in kg
  size?: string; // e.g., "10x20x5 cm"
  technicalDifficulty?: number; // 1 to 5
  mainImageUrl?: string;
  imageUrls?: string[];
  bom?: BomItem[]; // Bill of Materials for FABRICO_PROPRIO
  masterProductId?: string; // ID of the master product if this is a variant
} 