import { Routes } from '@angular/router';
import { ProductionOrderListComponent } from './production-order-list.component';
import { ProductionOrderFormComponent } from './production-order-form.component';

export const PRODUCTION_ORDERS_ROUTES: Routes = [
  {
    path: '',
    component: ProductionOrderListComponent,
  },
  {
    path: 'new',
    component: ProductionOrderFormComponent,
  }
]; 