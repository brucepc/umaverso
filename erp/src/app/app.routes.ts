import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
                title: 'Dashboard'
            },
            {
                path: 'products',
                loadChildren: () => import('./products/products.routes').then(m => m.PRODUCTS_ROUTES)
            },
            {
                path: 'categories',
                loadChildren: () => import('./categories/categories.routes').then(m => m.CATEGORIES_ROUTES)
            },
            {
                path: 'suppliers',
                loadChildren: () => import('./suppliers/suppliers.routes').then(m => m.SUPPLIERS_ROUTES)
            },
            {
                path: 'customers',
                loadChildren: () => import('./customers/customers.routes').then(m => m.CUSTOMERS_ROUTES)
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
                loadChildren: () => import('./accounts-payable/accounts-payable.routes').then(m => m.ACCOUNTS_PAYABLE_ROUTES),
            },
            {
                path: 'accounts-receivable',
                loadChildren: () => import('./accounts-receivable/accounts-receivable.routes').then(m => m.ACCOUNTS_RECEIVABLE_ROUTES),
            }
        ]
    },
    { path: '**', redirectTo: '' }
];
