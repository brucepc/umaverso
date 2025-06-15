import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';
import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
import { ProductService } from '../products/product.service';
import { ProductionOrderService } from './production-order.service';
import { ProductionOrder } from '@models/production-order.model';

@Component({
  selector: 'app-production-order-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './production-order-form.component.html',
  styleUrl: './production-order-form.component.scss'
})
export class ProductionOrderFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private productionOrderService = inject(ProductionOrderService);

  form: FormGroup;
  finishedGoods$: Observable<Product[]>;
  isEdit = false;
  orderId: string | null = null;

  constructor() {
    this.finishedGoods$ = this.productService.getFinishedGoods();
    this.form = this.fb.group({
      productId: ['', Validators.required],
      quantityToProduce: [1, [Validators.required, Validators.min(1)]]
    });

    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.isEdit = true;
      // Here you would typically fetch the existing order and patch the form
      // For now, we'll focus on creation.
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    // Find the selected product to get its name
    this.finishedGoods$.subscribe(products => {
      const selectedProduct = products.find(p => p.id === formValue.productId);
      if (!selectedProduct) return;

      const newOrder: Omit<ProductionOrder, 'id'> = {
        productId: formValue.productId,
        productName: selectedProduct.name,
        quantityToProduce: formValue.quantityToProduce,
        creationDate: Timestamp.now(),
        status: 'Pendente'
      };

      this.productionOrderService.addProductionOrder(newOrder).then(() => {
        this.router.navigate(['/production-orders']);
      });
    });
  }
}
