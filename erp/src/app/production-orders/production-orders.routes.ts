import { Routes } from '@angular/router';

export const PRODUCTION_ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./production-order-list/production-order-list.component').then(m => m.ProductionOrderListComponent),
    title: 'Ordens de Produção'
  },
  {
    path: 'new',
    loadComponent: () => import('./production-order-form.component').then(m => m.ProductionOrderFormComponent),
    title: 'Nova Ordem de Produção'
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./production-order-form.component').then(m => m.ProductionOrderFormComponent),
    title: 'Editar Ordem de Produção'
  }
]; 