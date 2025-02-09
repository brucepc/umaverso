import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MainMenuViewportComponent } from './viewports/main-menu-viewport/main-menu-viewport.component';

export const routes: Routes = [
  {
    path: '',
    component: MainMenuViewportComponent,
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'category/:handle',
        component: ProductListComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent
      }
    ]
  }
];
