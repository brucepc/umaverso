export interface ProfitRules {
  minProfitPercentage: number; // % lucro mínimo (ex: 200 = 200%)
  recommendedProfitPercentage: number; // % lucro recomendado (ex: 300 = 300%)
  vatPercentage: number; // % IVA (ex: 23 = 23%)
}

export interface CompanyInfo {
  name: string;
  nif: string; // NIF/CNPJ
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
}

export interface SystemSettings {
  defaultPaymentTermDays: number; // Prazo padrão de pagamento em dias
  currencyCode: string; // EUR, USD, etc.
  dateFormat: string; // DD/MM/YYYY, MM/DD/YYYY, etc.
  numberFormat: string; // 1.234,56 or 1,234.56
}

export interface GeneralSettings {
  id: string;
  companyInfo: CompanyInfo;
  profitRules: ProfitRules;
  systemSettings: SystemSettings;
  createdAt: Date;
  updatedAt: Date;
}

// Interface para calcular preços baseado nas regras
export interface PriceCalculation {
  averageCost: number;
  minSalePrice: number;
  recommendedSalePrice: number;
  minProfitAmount: number;
  recommendedProfitAmount: number;
  vatAmount: number;
}
