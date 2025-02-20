import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterLink} from '@angular/router';
import {MainMenuViewportComponent} from '../../viewports/main-menu-viewport/main-menu-viewport.component';
import {CurrencyService} from '../../services/currency.service';
import {StoreCart} from '../../services/api';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    MainMenuViewportComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  cart = signal<StoreCart | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(public currencyService: CurrencyService) {
  }

  updateItemQuantity(lineItemId: string, quantity: number) {
    // TODO: Implement update quantity functionality
  }

  removeItem(lineItemId: string) {
    // TODO: Implement remove item functionality
  }

  proceedToCheckout() {
    // TODO: Implement checkout functionality
  }
}
