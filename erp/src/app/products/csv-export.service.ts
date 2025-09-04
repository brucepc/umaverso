import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '@models/product.model';
import { ECommerceProductDetails, VariationMapping } from '@models/ecommerce-product-details.model';
import { ProductService } from './product.service';
import { ECommerceProductService } from './ecommerce-product.service';

@Injectable({
  providedIn: 'root'
})
export class CsvExportService {
  private productService = inject(ProductService);
  private eCommerceProductService = inject(ECommerceProductService);
  private storageBucket = 'umaverso.firebasestorage.app'; // Nome do seu bucket do Firebase Storage

  constructor() { }

  /**
   * Converte uma URL de download do Firebase Storage (com token) para uma URL pública e estática.
   * @param url A URL original do Firebase.
   * @returns A URL pública no formato do Google Cloud Storage.
   */
  private convertToPublicUrl(url: string): string {
    if (!url) {
      return '';
    }
    try {
      const urlObject = new URL(url);
      const path = urlObject.pathname;
      // O caminho vem com /v0/b/[bucket]/o/ - precisamos extrair o que vem depois
      const filePath = decodeURIComponent(path.substring(path.indexOf('/o/') + 3));
      return `https://storage.googleapis.com/${this.storageBucket}/${filePath}`;
    } catch (error) {
      console.error('URL inválida:', url, error);
      return ''; // Retorna vazio se a URL for inválida
    }
  }

  async exportProductsToCsv(): Promise<void> {
    const allProducts = await firstValueFrom(this.productService.getProducts());
    
    const masterProducts = allProducts.filter(p => !p.masterProductId);
    const variantsByMasterId = allProducts.reduce((acc, p) => {
      if (p.masterProductId) {
        if (!acc[p.masterProductId]) {
          acc[p.masterProductId] = [];
        }
        acc[p.masterProductId].push(p);
      }
      return acc;
    }, {} as { [key: string]: Product[] });

    const headers = [
      'Item name', 'Variations', 'Option set 1', 'Option 1', 'Option set 2', 'Option 2',
      'Option set 3', 'Option 3', 'Option set 4', 'Option 4', 'Is variation visible? (Yes/No)',
      'Price', 'On sale in Online Store?', 'Regular price (before sale)', 'Tax rate (%)',
      'Set up different prices and VAT for takeaway', 'Takeaway price', 'Takeaway tax rate',
      'Unit', 'Track inventory? (Yes/No)', 'Quantity', 'Low stock threshold', 'SKU',
      'Barcode', 'Modifiers', 'Description (Online Store and Invoices only)', 'Category',
      'Display colour in POS checkout', 'Image 1', 'Image 2', 'Image 3', 'Image 4',
      'Image 5', 'Image 6', 'Image 7', 'Display item in Online Store? (Yes/No)',
      'SEO title (Online Store only)', 'SEO description (Online Store only)',
      'Shipping weight [kg] (Online Store only)', 'Item id (Do not change)', 'Variant id (Do not change)'
    ];

    const csvData = [headers];

    for (const master of masterProducts) {
      const eCommerceDetails = await firstValueFrom(this.eCommerceProductService.getDetailsByProductId(master.id));
      const variants = variantsByMasterId[master.id] || [];

      // Linha do Produto Mestre
      const masterRow = this.createMasterRow(master, eCommerceDetails, variants.length > 0);
      csvData.push(masterRow);

      // Linhas das Variantes
      if (eCommerceDetails && eCommerceDetails.variations) {
        for (const mapping of eCommerceDetails.variations) {
          const variantProduct = variants.find(v => v.id === mapping.variantId);
          if (variantProduct) {
            const variantRow = this.createVariantRow(variantProduct, eCommerceDetails, mapping);
            csvData.push(variantRow);
          }
        }
      }
    }
    
    this.downloadCsv(csvData, 'products_export.csv');
  }

  private createMasterRow(product: Product, eCommerceDetails: ECommerceProductDetails | null, hasVariations: boolean): any[] {
    return [
      product.name,
      '', // Variations (vazio para o mestre)
      eCommerceDetails?.optionSet1 || '',
      '', // Option 1
      eCommerceDetails?.optionSet2 || '',
      '', // Option 2
      eCommerceDetails?.optionSet3 || '',
      '', // Option 3
      '', '', // Option set 4 / Option 4
      '', // Is variation visible?
      hasVariations ? '' : product.salePrice, // Price
      eCommerceDetails?.onSale ? 'Yes' : 'No',
      hasVariations ? '' : product.regularPrice,
      eCommerceDetails?.taxRate || 0,
      eCommerceDetails?.hasTakeawayOption ? 'Yes' : 'No',
      eCommerceDetails?.takeawayPrice || '',
      eCommerceDetails?.takeawayTaxRate || '',
      (product.unit === 'un' ? 'each.each' : product.unit) || '',
      'Yes', // Track inventory?
      hasVariations ? '' : product.currentStock,
      hasVariations ? '' : product.lowStockThreshold,
      hasVariations ? '' : product.sku,
      hasVariations ? '' : product.barcode,
      '', // Modifiers
      product.description || '',
      product.categoryName || '',
      eCommerceDetails?.posDisplayColour || '',
      ...this.getPublicImageUrls(product), // Imagens
      eCommerceDetails?.displayInOnlineStore ? 'Yes' : 'No',
      eCommerceDetails?.seoTitle || '',
      eCommerceDetails?.seoDescription || '',
      product.weight || '',
      product.id, // Item id
      '', // Variant id
    ];
  }

  private createVariantRow(variant: Product, eCommerceDetails: ECommerceProductDetails, mapping: VariationMapping): any[] {
    return [
      '', // Item name (vazio para variantes)
      '', // Variations
      '', // Option set 1
      mapping.option1 || '',
      '', // Option set 2
      mapping.option2 || '',
      '', // Option set 3
      mapping.option3 || '',
      '', '', // Option set 4 / Option 4
      'Yes', // Is variation visible?
      variant.salePrice || 0,
      eCommerceDetails.onSale ? 'Yes' : 'No',
      variant.regularPrice || '',
      eCommerceDetails.taxRate || 0,
      eCommerceDetails.hasTakeawayOption ? 'Yes' : 'No',
      eCommerceDetails.takeawayPrice || '',
      eCommerceDetails.takeawayTaxRate || '',
      (variant.unit === 'un' ? 'cada' : variant.unit) || '',
      'Yes', // Track inventory?
      variant.currentStock,
      variant.lowStockThreshold || '',
      variant.sku,
      variant.barcode || '',
      '', // Modifiers
      '', // Description
      '', // Category
      '', // Display colour
      ...this.getPublicImageUrls(variant), // Imagens da variante, se houver
      eCommerceDetails.displayInOnlineStore ? 'Yes' : 'No',
      '', // SEO
      '', // SEO
      variant.weight || '',
      eCommerceDetails.productId, // Item id (ID do mestre)
      variant.id, // Variant id
    ];
  }

  private getPublicImageUrls(product: Product): string[] {
    const imageUrls = (product.imageUrls || []).map(url => this.convertToPublicUrl(url)).slice(0, 7);
    const paddedUrls = [...imageUrls, ...Array(7 - imageUrls.length).fill('')];
    return paddedUrls;
  }

  private downloadCsv(data: any[][], filename: string): void {
    const csvContent = data.map(row => 
      row.map(field => {
        const strField = String(field === null || field === undefined ? '' : field);
        // Escapa aspas duplas e envolve o campo em aspas se contiver vírgulas, aspas ou quebras de linha.
        if (strField.includes('"') || strField.includes(',') || strField.includes('\n')) {
          return `"${strField.replace(/"/g, '""')}"`;
        }
        return strField;
      }).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
