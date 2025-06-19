export interface Customer {
  id: string;
  name: string;
  nif: string; // NIF (Número de Identificação Fiscal)
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    zipCode?: string;
    city?: string;
    state?: string;
  };
  isActive: boolean;
} 