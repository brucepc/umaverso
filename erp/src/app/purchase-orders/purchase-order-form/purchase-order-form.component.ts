import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '@models/product.model';
import { PurchaseOrder } from '@models/purchase-order.model';
import { Supplier } from '@models/supplier.model';
import { Timestamp } from '@angular/fire/firestore';
import { ProductService } from '../../products/product.service';
import { SupplierService } from '../../suppliers/supplier.service';
import { PurchaseOrderService } from '../../purchase-orders/purchase-order.service';
import { combineLatest, of } from 'rxjs';
import { map, switchMap, take, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-purchase-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './purchase-order-form.component.html',
  styleUrl: './purchase-order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseOrderFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private supplierService = inject(SupplierService);
  private productService = inject(ProductService);
  private purchaseOrderService = inject(PurchaseOrderService);
  private route = inject(ActivatedRoute);

  suppliers$ = this.supplierService.getSuppliers();
  products$ = this.productService.getProducts();

  isEditMode = false;
  private orderId: string | null = null;

  form = this.fb.group({
    supplier: [null as Supplier | null, Validators.required],
    issueDate: [new Date(), Validators.required],
    status: ['OPEN', Validators.required],
    items: this.fb.array([], [Validators.required, Validators.minLength(1)]),
    total: [{ value: 0, disabled: true }]
  });

  displayedColumns = ['product', 'quantity', 'unitCost', 'total', 'actions'];

  get items() {
    return this.form.get('items') as FormArray;
  }

  constructor() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.isEditMode = true;
      this.loadOrderData(this.orderId);
    } else {
      this.addItem();
    }
  }

  loadOrderData(id: string): void {
    this.purchaseOrderService.getPurchaseOrderById(id).pipe(take(1)).subscribe(order => {
      if (order) {
        combineLatest([this.suppliers$, this.products$]).pipe(take(1)).subscribe(([suppliers, products]) => {
          const supplier = suppliers.find(s => s.id === order.supplierId);
          this.form.patchValue({
            supplier: supplier,
            issueDate: order.issueDate.toDate(),
            status: order.status,
          });

          this.items.clear();
          order.items.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            const itemGroup = this.createItem();
            itemGroup.patchValue({
              product: product,
              quantity: item.quantity,
              unitCost: item.unitCost
            });
            this.items.push(itemGroup);
          });
        });
      }
    });
  }

  createItem(): FormGroup {
    const itemGroup = this.fb.group({
      product: [null as Product | null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitCost: [0, [Validators.required, Validators.min(0)]],
      total: [0, [Validators.required, Validators.min(0)]]
    });

    itemGroup.get('quantity')?.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(() => this.updateItemTotal(itemGroup));
    itemGroup.get('unitCost')?.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(() => this.updateItemTotal(itemGroup));
    itemGroup.get('total')?.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(totalValue => {
      this.updateUnitCost(itemGroup, totalValue);
    });

    itemGroup.get('product')?.valueChanges.subscribe((product: Product | null) => {
      itemGroup.get('unitCost')?.setValue(product?.averageCost || 0);
    });

    return itemGroup;
  }

  updateItemTotal(itemGroup: FormGroup): void {
    const quantity = itemGroup.get('quantity')?.value || 0;
    const unitCost = itemGroup.get('unitCost')?.value || 0;
    itemGroup.get('total')?.patchValue(quantity * unitCost, { emitEvent: false });
    this.updateTotal();
  }

  updateUnitCost(itemGroup: FormGroup, totalValue: number | null): void {
    if (totalValue === null) return;
    const quantity = itemGroup.get('quantity')?.value || 0;
    if (quantity > 0) {
      itemGroup.get('unitCost')?.patchValue(totalValue / quantity, { emitEvent: false });
    }
    this.updateTotal();
  }

  updateTotal(): void {
    const totalValue = this.items.getRawValue().reduce(
      (acc: number, item: any) => acc + (item.quantity || 0) * (item.unitCost || 0), 0
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
    this.router.navigate(['/purchase-orders']);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const totalValue = formValue.items.reduce((acc: number, item: any) => acc + (item.quantity * item.unitCost), 0);

    const purchaseOrderData = {
      supplierId: formValue.supplier!.id,
      supplierName: formValue.supplier!.name,
      issueDate: Timestamp.fromDate(formValue.issueDate!),
      status: this.isEditMode ? this.form.value.status : 'OPEN',
      items: formValue.items.map((item: any) => ({
        productId: item.product.id,
        productName: item.product.name,
        productSku: item.product.sku,
        quantity: item.quantity,
        unitCost: item.unitCost,
      })),
      totalValue,
    };

    const saveOperation = this.isEditMode && this.orderId
      ? this.purchaseOrderService.updatePurchaseOrder({ id: this.orderId, ...purchaseOrderData } as PurchaseOrder)
      : this.purchaseOrderService.addPurchaseOrder(purchaseOrderData as Omit<PurchaseOrder, 'id'>);

    saveOperation
      .then(() => this.router.navigate(['/purchase-orders']))
      .catch(err => console.error('Error saving purchase order', err));
  }
} 