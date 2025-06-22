import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@models/product.model';
import { PurchaseOrder, PurchaseOrderStatus } from '@models/purchase-order.model';
import { Supplier } from '@models/supplier.model';
import {
  NgHeaderTemplateDirective,
  NgSelectComponent,
  NgSelectModule,
} from '@ng-select/ng-select';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  take,
} from 'rxjs/operators';
import { ProductService } from '../../products/product.service';
import { PurchaseOrderService } from '../../purchase-orders/purchase-order.service';
import { SupplierFormDialogComponent } from '../../suppliers/supplier-form-dialog/supplier-form-dialog.component';
import { SupplierService } from '../../suppliers/supplier.service';

@Component({
  selector: 'app-purchase-order-form',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    NgHeaderTemplateDirective,
    MatDialogModule,
    NgSelectComponent,
    NgSelectModule,
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
  private dialog = inject(MatDialog);

  private suppliersSubject = new BehaviorSubject<void>(undefined);
  private orderId: string | null = null;
  private order: PurchaseOrder | null = null;
  private items = this.fb.array<FormGroup>(
    [],
    [Validators.required, Validators.minLength(1)]
  );

  suppliers$ = this.suppliersSubject
    .asObservable()
    .pipe(switchMap(() => this.supplierService.getSuppliers()));
  products$ = this.productService.getProducts();

  isEditMode = false;
  status: PurchaseOrderStatus | null = null;
  PurchaseOrderStatus = PurchaseOrderStatus;

  form = this.fb.group({
    supplier: [null as Supplier | null, Validators.required],
    emissionDate: [new Date(), Validators.required],
    estimatedDeliveryDate: [new Date(), Validators.required],
    status: [null as PurchaseOrderStatus | null],
    items: this.items,
    total: [{ value: 0, disabled: true }],
  });
  dataSource = new MatTableDataSource(this.items.controls);

  displayedColumns = ['product', 'quantity', 'unitCost', 'total', 'actions'];

  constructor() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.isEditMode = true;
      this.loadOrderData(this.orderId);
    } else {
      this.status = PurchaseOrderStatus.PENDING_APPROVAL;
      this.addItem();
    }
  }

  compareProducts(p1: Product, p2: Product): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

  loadOrderData(id: string): void {
    this.purchaseOrderService
      .getPurchaseOrders()
      .pipe(take(1))
      .subscribe((orders) => {
        const order = orders.find((o) => o.id === id);
        if (order) {
          this.order = order;
          this.status = order.status;
          combineLatest([this.suppliers$, this.products$])
            .pipe(take(1))
            .subscribe(([suppliers, products]) => {
              const supplier = suppliers.find((s) => s.id === order.supplierId);
              this.form.patchValue({
                supplier: supplier,
                emissionDate: order.emissionDate.toDate(),
                estimatedDeliveryDate: order.estimatedDeliveryDate.toDate(),
                status: order.status,
              });

              this.items.clear();
              order.items.forEach((item: any) => {
                const product = products.find((p) => p.id === item.productId);
                const itemGroup = this.createItem();
                itemGroup.patchValue({
                  product: product,
                  quantity: item.quantity,
                  unitCost: item.unitCost,
                });
                this.items.push(itemGroup);
              });
              this.dataSource.data = this.items.controls;
              this.updateTotal();
            });
        }
      });
  }

  createItem(): FormGroup {
    const itemGroup = this.fb.group({
      product: [null as Product | null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitCost: [0, [Validators.required, Validators.min(0)]],
      total: [0, [Validators.required, Validators.min(0)]],
    });

    itemGroup
      .get('quantity')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        const quantity = itemGroup.get('quantity')?.value || 0;
        const unitCost = itemGroup.get('unitCost')?.value || 0;
        itemGroup
          .get('total')
          ?.setValue(quantity * unitCost, { emitEvent: false });
        this.updateTotal();
      });
    itemGroup
      .get('unitCost')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        const quantity = itemGroup.get('quantity')?.value || 0;
        const unitCost = itemGroup.get('unitCost')?.value || 0;
        itemGroup
          .get('total')
          ?.setValue(quantity * unitCost, { emitEvent: false });
        this.updateTotal();
      });

    itemGroup
      .get('total')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        const quantity = itemGroup.get('quantity')?.value;
        const total = itemGroup.get('total')?.value || 0;
        if (quantity) {
          itemGroup
            .get('unitCost')
            ?.setValue(total / quantity, { emitEvent: false });
        }
        this.updateTotal();
      });

    itemGroup
      .get('product')
      ?.valueChanges.subscribe((product: Product | null) => {
        itemGroup.get('unitCost')?.setValue(product?.averageCost || 0);
      });

    return itemGroup;
  }

  updateTotal(): void {
    const totalValue = this.items.getRawValue().reduce((acc: number, item) => {
      const quantity = item['quantity'] || 0;
      const unitCost = item['unitCost'] || 0;
      return acc + quantity * unitCost;
    }, 0);
    this.form.get('total')?.setValue(totalValue);
  }

  addItem(): void {
    const newItem = this.createItem();
    this.items.push(newItem);
    this.dataSource.data = this.items.controls;
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.dataSource.data = this.items.controls;
    this.updateTotal();
  }

  goBack(): void {
    this.router.navigate(['/purchase-orders']);
  }

  onApprove(): void {
    if (!this.order) return;
    this.purchaseOrderService
      .approvePurchaseOrder(this.order)
      .then(() => this.router.navigate(['/purchase-orders']))
      .catch((err) => console.error('Error approving order', err));
  }

  onReject(): void {
    if (!this.orderId) return;
    this.purchaseOrderService
      .rejectPurchaseOrder(this.orderId)
      .then(() => this.router.navigate(['/purchase-orders']))
      .catch((err) => console.error('Error rejecting order', err));
  }

  addNewSupplier(): void {
    const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
      minWidth: 800,
    });

    dialogRef.afterClosed().subscribe((newSupplier) => {
      if (newSupplier) {
        this.suppliersSubject.next();
        this.form.get('supplier')?.setValue(newSupplier);
      }
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const purchaseOrderData: Partial<PurchaseOrder> = {
      supplierId: formValue.supplier!.id,
      supplierName: formValue.supplier!.name,
      emissionDate: Timestamp.fromDate(formValue.emissionDate!),
      estimatedDeliveryDate: Timestamp.fromDate(
        formValue.estimatedDeliveryDate!
      ),
      items: formValue.items.map((item: any) => {
        const quantity = item.quantity || 0;
        const unitCost = item.unitCost || 0;
        return {
          productId: item.product.id,
          productName: item.product.name,
          quantity: quantity,
          unitCost: unitCost,
          totalPrice: quantity * unitCost,
        };
      }),
      total: formValue.total || 0,
    };

    if (this.isEditMode && this.orderId) {
      this.purchaseOrderService
        .updatePurchaseOrder(this.orderId, purchaseOrderData)
        .then(() => this.router.navigate(['/purchase-orders']));
    } else {
      const { status, ...orderDataForCreation } = purchaseOrderData;

      this.purchaseOrderService
        .addPurchaseOrder(
          orderDataForCreation as Omit<PurchaseOrder, 'id' | 'status' | 'code'>
        )
        .then(() => this.router.navigate(['/purchase-orders']));
    }
  }
}
