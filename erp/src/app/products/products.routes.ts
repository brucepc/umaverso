import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./product-list/product-list.component').then(m => m.ProductListComponent),
    title: 'Lista de Produtos'
  },
  // Se houver uma rota para detalhes do produto, ela viria aqui.
  // Ex: { path: ':id', component: ProductDetailComponent }
]; 