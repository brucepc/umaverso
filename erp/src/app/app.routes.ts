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
        children: [
            {
                path: '',
                loadComponent: () => import('./production-orders/production-order-list.component').then(m => m.ProductionOrderListComponent)
            },
            {
                path: 'new',
                loadComponent: () => import('./production-orders/production-order-form.component').then(m => m.ProductionOrderFormComponent)
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./production-orders/production-order-form.component').then(m => m.ProductionOrderFormComponent)
            }
        ]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];
