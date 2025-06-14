export interface Supplier {
  id: string;
  name: string; // Razão Social ou Nome
  nif: string; // Número de Identificação Fiscal
  email: string;
  phone: string;
  url?: string; // Website do fornecedor
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  isActive: boolean;
} 