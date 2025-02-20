import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any;
  private numberFormat = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'eur'
  });

  constructor(
    public currencyService: CurrencyService
  ) {
  }

  getLowestPrice(): number {

    if (!this.product?.variants?.length) return 0;

    const prices = this.product.variants
      .flatMap((variant: any) => variant.calculated_price)
      .filter((price: any) => price)
      .map((price: any) => price.calculated_amount);

    return prices.length > 0 ? Math.min(...prices) : 0;
  }

  getHighestPrice(): number {
    if (!this.product?.variants?.length) return 0;

    const prices = this.product.variants
      .flatMap((variant: any) => variant.calculated_price)
      .filter((price: any) => price)
      .map((price: any) => price.calculated_amount);

    return prices.length > 0 ? Math.max(...prices) : 0;
  }
}
