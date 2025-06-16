import { Routes } from '@angular/router';

export const SALES_ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./sales-order-list/sales-order-list.component').then(m => m.SalesOrderListComponent),
    title: 'Pedidos de Venda'
  },
  {
    path: 'new',
    loadComponent: () => import('./sales-order-form/sales-order-form.component').then(m => m.SalesOrderFormComponent),
    title: 'Novo Pedido de Venda'
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./sales-order-form/sales-order-form.component').then(m => m.SalesOrderFormComponent),
    title: 'Editar Pedido de Venda'
  }
]; 