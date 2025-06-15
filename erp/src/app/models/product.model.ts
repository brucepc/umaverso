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
  productType: 'MATERIA_PRIMA' | 'PRODUTO_ACABADO' | 'REVENDA';
  unitOfMeasure: string;
  currentStock: number;
  averageCost: number;
  salePrice?: number;
  isActive: boolean;
  bom?: BomItem[]; // Bill of Materials for PRODUTO_ACABADO
} 