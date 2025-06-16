import { Component, OnInit, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Timestamp } from '@angular/fire/firestore';
import { combineLatest } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

import { CustomerService } from '../../customers/customer.service';
import { ProductService } from '../../products/product.service';
import { SalesOrderService } from '../sales-order.service';
import { Customer } from '@models/customer.model';
import { Product } from '@models/product.model';
import { SalesOrder } from '@models/sales-order.model';

@Component({
  selector: 'app-sales-order-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule,
    MatTableModule, MatTooltipModule,
  ],
  templateUrl: './sales-order-form.component.html',
  styleUrls: ['./sales-order-form.component.scss']
})
export class SalesOrderFormComponent implements OnInit {
  private salesOrderService = inject(SalesOrderService);
  private customerService = inject(CustomerService);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);

  customers$ = this.customerService.getCustomers();
  products$ = this.productService.getProducts();

  isEditMode = false;
  private orderId: string | null = null;
  form!: FormGroup;
  
  displayedColumns: string[] = ['product', 'quantity', 'unitPrice', 'totalPrice', 'actions'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.orderId;
    this.initForm();

    if (this.isEditMode && this.orderId) {
      this.loadOrderData(this.orderId);
    } else {
      this.addItem();
    }
    this.updateGrandTotal(); // Initial calculation
  }
  
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  initForm(): void {
    this.form = this.fb.group({
      code: ['', Validators.required],
      customer: [null as Customer | null, Validators.required],
      emissionDate: [new Date(), Validators.required],
      items: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      total: [{ value: 0, disabled: true }]
    });
  }

  createItem(): FormGroup {
    const itemGroup = this.fb.group({
      product: [null as Product | null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      totalPrice: [0, [Validators.required, Validators.min(0)]]
    });

    itemGroup.get('product')?.valueChanges.subscribe((product: Product | null) => {
      itemGroup.get('unitPrice')?.patchValue(product?.salePrice || 0, { emitEvent: false });
      this.updateItemTotal(itemGroup);
    });

    itemGroup.get('quantity')?.valueChanges.pipe(debounceTime(200)).subscribe(() => this.updateItemTotal(itemGroup));
    itemGroup.get('unitPrice')?.valueChanges.pipe(debounceTime(200)).subscribe(() => this.updateItemTotal(itemGroup));
    itemGroup.get('totalPrice')?.valueChanges.pipe(debounceTime(200)).subscribe((total: number | null) => this.updateUnitPrice(itemGroup, total));

    return itemGroup;
  }

  updateItemTotal(itemGroup: FormGroup): void {
    const quantity = itemGroup.get('quantity')?.value || 0;
    const unitPrice = itemGroup.get('unitPrice')?.value || 0;
    itemGroup.get('totalPrice')?.patchValue(quantity * unitPrice, { emitEvent: false });
    this.updateGrandTotal();
  }

  updateUnitPrice(itemGroup: FormGroup, totalPrice: number | null): void {
    if (totalPrice === null) return;
    const quantity = itemGroup.get('quantity')?.value || 0;
    if (quantity > 0) {
      itemGroup.get('unitPrice')?.patchValue(totalPrice / quantity, { emitEvent: false });
    }
    this.updateGrandTotal();
  }
  
  updateGrandTotal(): void {
    const totalValue = this.items.getRawValue().reduce(
      (acc: number, item: any) => acc + (item.totalPrice || 0), 0
    );
    this.form.get('total')?.setValue(totalValue, { emitEvent: false });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  goBack(): void {
    this.router.navigate(['/sales-orders']);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.getRawValue();
    const salesOrderData = {
      code: formValue.code,
      customerId: formValue.customer.id,
      customerName: formValue.customer.name,
      emissionDate: Timestamp.fromDate(formValue.emissionDate),
      total: formValue.total,
      status: 'DRAFT' as const,
      items: formValue.items.map((item: any) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      }))
    };
    
    const saveOperation = this.isEditMode && this.orderId
      ? this.salesOrderService.updateSalesOrder({ id: this.orderId, ...salesOrderData } as SalesOrder)
      : this.salesOrderService.addSalesOrder(salesOrderData as Omit<SalesOrder, 'id'>);

    saveOperation.then(() => {
      this.snackBar.open(`Pedido ${this.isEditMode ? 'atualizado' : 'salvo'} com sucesso!`, 'Fechar', { duration: 3000 });
      this.router.navigate(['/sales-orders']);
    }).catch(err => {
      console.error(err);
      this.snackBar.open('Erro ao salvar o pedido.', 'Fechar', { duration: 3000 });
    });
  }

  loadOrderData(id: string): void {
    this.salesOrderService.getSalesOrderById(id).pipe(take(1)).subscribe(order => {
      if (order) {
        combineLatest([this.customers$, this.products$]).pipe(take(1)).subscribe(([customers, products]) => {
          
          const customer = customers.find(c => c.id === order.customerId);
          
          this.form.patchValue({
            code: order.code,
            customer: customer,
            emissionDate: order.emissionDate.toDate(),
          });

          this.items.clear();
          order.items.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            const itemGroup = this.createItem();
            itemGroup.patchValue({
              product: product,
              quantity: item.quantity,
              unitPrice: item.unitPrice
            });
            this.updateItemTotal(itemGroup);
            this.items.push(itemGroup);
          });

          this.updateGrandTotal();
        });
      }
    });
  }
}
