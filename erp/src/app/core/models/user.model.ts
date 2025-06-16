export interface User {
  uid: string;
  email: string;
  displayName?: string;
  active: boolean;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
} 