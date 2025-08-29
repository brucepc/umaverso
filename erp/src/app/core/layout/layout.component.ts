import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth, User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/core/auth.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser$: Observable<User | null> = this.authService.currentUser;

  navItems = [
    { name: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { name: 'Produtos', route: '/products', icon: 'inventory_2' },
    { name: 'Categorias', route: '/categories', icon: 'category' },
    { name: 'Fornecedores', route: '/suppliers', icon: 'local_shipping' },
    { name: 'Clientes', route: '/customers', icon: 'people' },
    {
      name: 'Pedidos de Compra',
      route: '/purchase-orders',
      icon: 'shopping_cart',
    },
    { name: 'Pedidos de Venda', route: '/sales-orders', icon: 'storefront' },
    {
      name: 'Ordens de Produção',
      route: '/production-orders',
      icon: 'precision_manufacturing',
    },
    { name: 'Contas a Pagar', route: '/accounts-payable', icon: 'payment' },
    {
      name: 'Contas a Receber',
      route: '/accounts-receivable',
      icon: 'request_quote',
    },
    {
      name: 'Configurações',
      route: '/general-settings',
      icon: 'settings',
    },
  ];

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
