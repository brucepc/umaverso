import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'produtos',
        loadComponent: () => import('./produtos/produto-list/produto-list.component').then(c => c.ProdutoListComponent)
    },
    {
        path: 'categories',
        loadComponent: () => import('./categories/category-list/category-list.component').then(c => c.CategoryListComponent)
    },
    {
        path: '',
        redirectTo: 'produtos',
        pathMatch: 'full'
    }
];
