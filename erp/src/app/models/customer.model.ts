export interface Customer {
  id: string;
  name: string;
  document: string; // CPF or CNPJ
  email: string;
  phone?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    zipCode: string;
    city: string;
    state: string;
  };
  isActive: boolean;
} 