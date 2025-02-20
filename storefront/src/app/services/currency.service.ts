import { computed, Injectable, signal } from '@angular/core';
import { Currency } from "@medusajs/medusa";
import { RegionsService } from './api';
import { MedusaService } from './medusa.service';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currentCurrency = signal<Currency | null>(null);
  currencies = signal<Currency[]>([]);
  currencySymbol = computed(() => this.currentCurrency()?.symbol);

  constructor(
    private medusaService: MedusaService,
    private regionsService: RegionsService
  ) {
    this.loadCurrencies();
  }

  private loadCurrencies(): void {
    this.regionsService.getRegions(this.medusaService.publishableApiKey, 'currency, name')
    .subscribe((currencies: any) => {
      this.currencies.set(currencies);
    });
  }

  setCurrency(currencyCode: string) {
    const currency = this.currencies().find(c => c.code === currencyCode);
    if (currency) {
      this.currentCurrency.set(currency);
    }
  }
}
