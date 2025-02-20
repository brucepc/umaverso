import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyService } from '../../services/currency.service';


@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent {
  constructor(
    public currencyService: CurrencyService
  ) {}

  changeCurrency(event: any) {
    this.currencyService.setCurrency(event.value);
  }
} 