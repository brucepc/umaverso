export interface Produto {
  id?: string;
  categoryId?: string;
  sku: string;
  name: string;
  productType: 'MATERIA_PRIMA' | 'PRODUTO_ACABADO' | 'REVENDA';
  unitOfMeasure: string;
  currentStock: number;
  salePrice?: number;
  isActive: boolean;
} 