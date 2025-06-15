import { Routes } from '@angular/router';

export const SALES_ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./sales-order-list/sales-order-list.component').then(m => m.SalesOrderListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./sales-order-form/sales-order-form.component').then(m => m.SalesOrderFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./sales-order-form/sales-order-form.component').then(m => m.SalesOrderFormComponent),
  },
]; 