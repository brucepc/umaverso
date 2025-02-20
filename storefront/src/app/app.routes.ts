import { Routes } from '@angular/router';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListPageComponent
  },
  {
    path: 'category/:handle',
    component: ProductListPageComponent
  },
  {
    path: 'product/:handle',
    component: ProductDetailsPageComponent
  },
  {
    path: 'cart',
    component: CartPageComponent
  }
];
