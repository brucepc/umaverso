// src/app/models/ecommerce-product-details.model.ts

/**
 * Mapeia um produto variante (que tem seu próprio SKU, preço, estoque, etc.)
 * aos valores das opções definidas no produto mestre.
 */
export interface VariationMapping {
  variantId: string; // ID do Product que é a variante
  option1: string;   // Valor da Opção 1 (ex: "Dourado")
  option2?: string;  // Valor da Opção 2 (ex: "Pequeno")
  option3?: string;  // Valor da Opção 3
}

export interface ECommerceProductDetails {
  id: string; // Document ID in Firestore
  productId: string; // Foreign key to the main Product
  displayInOnlineStore: boolean;
  onSale: boolean;
  taxRate: number; // in percentage
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  
  // Options for variations
  optionSet1?: string; // e.g., "Cor"
  optionSet2?: string; // e.g., "Tamanho"
  optionSet3?: string;
  
  // Mapeamento das Variantes
  variations?: VariationMapping[];
  
  // Takeaway (if applicable)
  hasTakeawayOption?: boolean;
  takeawayPrice?: number;
  takeawayTaxRate?: number;
  
  // Display
  posDisplayColour?: string;
}
