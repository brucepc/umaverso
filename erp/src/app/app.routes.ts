import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'produtos',
        loadComponent: () => import('./produtos/produto-list/produto-list.component').then(c => c.ProdutoListComponent)
    },
    {
        path: 'categories',
        loadComponent: () => import('./categories/category-list/category-list.component').then(c => c.CategoryListComponent)
    },
    {
        path: 'suppliers',
        loadComponent: () => import('./suppliers/supplier-list/supplier-list.component').then(c => c.SupplierListComponent)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];
