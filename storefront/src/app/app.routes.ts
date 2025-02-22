import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component')
      .then(m => m.HomePageComponent),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/product-list-page/product-list-page.component')
      .then(m => m.ProductListPageComponent)
  },
  {
    path: 'category/:handle',
    loadComponent: () => import('./pages/product-list-page/product-list-page.component')
      .then(m => m.ProductListPageComponent)
  },
  {
    path: 'product/:handle',
    loadComponent: () => import('./pages/product-details-page/product-details-page.component')
      .then(m => m.ProductDetailsPageComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart-page/cart-page.component')
      .then(m => m.CartPageComponent),
  },
  {
    path: 'user/:useId',
    loadComponent: () => import('./pages/user-details-page/user-details-page.component')
      .then(m => m.UserDetailsPageComponent),
  },
  {
    path: 'signIn',
    loadComponent: () => import('./pages/credentials-page/credentials-page.component')
      .then(m => m.CredentialsPageComponent)
  },
  {
    path: 'signUp',
    loadComponent: () => import('./pages/credentials-page/credentials-page.component')
      .then(m => m.CredentialsPageComponent),
  }
];
