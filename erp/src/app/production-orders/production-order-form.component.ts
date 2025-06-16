import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Product } from '@models/product.model';
import { ProductService } from '@app/products/product.service';
import { ProductionOrderService } from '@app/production-orders/production-order.service';
import { Observable, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-production-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './production-order-form.component.html',
  styleUrl: './production-order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionOrderFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private productService = inject(ProductService);
  private productionOrderService = inject(ProductionOrderService);
  private snackBar = inject(MatSnackBar);

  productsToProduce$: Observable<Product[]> = this.productService.getProducts().pipe(
    map((products: Product[]) => products.filter((p: Product) => p.productType === 'FABRICO_PROPRIO' && p.isActive))
  );

  form = this.fb.group({
    product: [null as Product | null, Validators.required],
    quantityToProduce: [1, [Validators.required, Validators.min(1)]],
  });

  goBack(): void {
    this.router.navigate(['/production-orders']);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { product, quantityToProduce } = this.form.getRawValue();

    const newOrder = {
      productId: product!.id,
      productName: product!.name,
      quantityToProduce: quantityToProduce!,
    };

    this.productionOrderService.addProductionOrder(newOrder)
      .then(() => {
        this.snackBar.open('Ordem de produção criada com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/production-orders']);
      })
      .catch((err: Error) => {
        console.error(err);
        this.snackBar.open(`Erro ao criar ordem: ${err.message}`, 'Fechar', { duration: 5000 });
      });
  }
}
