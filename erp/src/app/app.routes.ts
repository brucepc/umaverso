import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('./products/product-list/product-list.component').then(c => c.ProductListComponent)
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
        path: 'customers',
        loadComponent: () => import('./customers/customer-list/customer-list.component').then(c => c.CustomerListComponent)
    },
    {
        path: 'purchase-orders',
        loadChildren: () => import('./purchase-orders/purchase-orders.routes').then(m => m.PURCHASE_ORDERS_ROUTES)
    },
    {
        path: 'sales-orders',
        loadChildren: () => import('./sales-orders/sales-orders.routes').then(m => m.SALES_ORDERS_ROUTES)
    },
    {
        path: 'production-orders',
        loadChildren: () => import('./production-orders/production-orders.routes').then(m => m.PRODUCTION_ORDERS_ROUTES)
    },
    {
        path: 'accounts-payable',
        loadChildren: () => import('./accounts-payable/accounts-payable.routes').then(m => m.ACCOUNTS_PAYABLE_ROUTES)
    },
    {
        path: 'accounts-receivable',
        loadChildren: () => import('./accounts-receivable/accounts-receivable.routes').then(m => m.ACCOUNTS_RECEIVABLE_ROUTES)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];
