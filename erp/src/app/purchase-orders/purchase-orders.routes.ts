import { Routes } from '@angular/router';

export const PURCHASE_ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./purchase-order-list/purchase-order-list.component').then(m => m.PurchaseOrderListComponent),
    title: 'Pedidos de Compra'
  },
  {
    path: 'new',
    loadComponent: () => import('./purchase-order-form/purchase-order-form.component').then(m => m.PurchaseOrderFormComponent),
    title: 'Novo Pedido de Compra'
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./purchase-order-form/purchase-order-form.component').then(m => m.PurchaseOrderFormComponent),
    title: 'Editar Pedido de Compra'
  }
]; 