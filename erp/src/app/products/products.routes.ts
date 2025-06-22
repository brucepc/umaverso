import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductStockHistoryComponent } from './product-stock-history/product-stock-history.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent,
    title: 'Lista de Produtos'
  },
  {
    path: 'new',
    component: ProductFormComponent,
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
  },
  {
    path: 'stock-history/:id',
    component: ProductStockHistoryComponent,
  },
  // Se houver uma rota para detalhes do produto, ela viria aqui.
  // Ex: { path: ':id', component: ProductDetailComponent }
]; 