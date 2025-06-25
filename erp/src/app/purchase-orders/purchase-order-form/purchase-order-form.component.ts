import { AsyncPipe, CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType } from '@models/product-type.enum';
import { Product } from '@models/product.model';
import {
  PurchaseOrder,
  PurchaseOrderStatus,
} from '@models/purchase-order.model';
import { Supplier } from '@models/supplier.model';
import {
  NgHeaderTemplateDirective,
  NgSelectComponent,
  NgSelectModule,
} from '@ng-select/ng-select';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
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
    MatTooltipModule,
    MatCardModule,
    NgHeaderTemplateDirective,
    MatDialogModule,
    NgSelectComponent,
    NgSelectModule,
  ],
  templateUrl: './purchase-order-form.component.html',
  styleUrl: './purchase-order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseOrderFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private supplierService = inject(SupplierService);
  private productService = inject(ProductService);
  private purchaseOrderService = inject(PurchaseOrderService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  private suppliersSubject = new BehaviorSubject<void>(undefined);
  private orderId: string | null = null;

  suppliers: Supplier[] = [];
  products: Product[] = [];

  suppliers$ = this.suppliersSubject
    .asObservable()
    .pipe(switchMap(() => this.supplierService.getSuppliers()));
  products$ = this.productService
    .getProducts()
    .pipe(
      map((products) =>
        products.filter(
          (p) =>
            p.productType === ProductType.Revenda ||
            p.productType === ProductType.MateriaPrima
        )
      )
    );

  isEditMode = false;
  isMarketplace = false;
  status: PurchaseOrderStatus | null = null;
  PurchaseOrderStatus = PurchaseOrderStatus;

  form: FormGroup;
  items: FormArray;

  constructor() {
    this.form = this.fb.group({
      id: [null],
      code: [{ value: '', disabled: true }],
      supplier: [null as Supplier | null],
      emissionDate: [new Date(), Validators.required],
      estimatedDeliveryDate: [null, Validators.required],
      items: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      total: [{ value: 0, disabled: true }],
      freightCost: [0],
      status: [PurchaseOrderStatus.PENDING_APPROVAL, Validators.required],
    });
    this.items = this.form.get('items') as FormArray;
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');

    // Fetch products and suppliers at the beginning
    this.productService
      .getProducts()
      .subscribe((prods) => (this.products = prods));
    this.supplierService
      .getSuppliers()
      .subscribe((sups) => (this.suppliers = sups));

    if (this.orderId) {
      this.isEditMode = true;
      this.loadOrderData(this.orderId);
    } else {
      this.status = PurchaseOrderStatus.PENDING_APPROVAL;
      this.addItem();
    }

    this.form.get('supplier')?.valueChanges.subscribe((supplier) => {
      this.isMarketplace = !supplier;
      this.updateItemSupplierValidation();
    });

    this.form
      .get('freightCost')
      ?.valueChanges.subscribe(() => this.updateCalculations());
  }

  compareProducts(p1: Product, p2: Product): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

  compareSuppliers(s1: Supplier, s2: Supplier): boolean {
    return s1 && s2 ? s1.id === s2.id : s1 === s2;
  }

  loadOrderData(id: string): void {
    this.purchaseOrderService
      .getPurchaseOrders()
      .pipe(take(1))
      .subscribe((orders) => {
        const order = orders.find((o) => o.id === id);
        if (order) {
          const supplier = this.suppliers.find(
            (s) => s.id === order.supplierId
          );
          this.form.patchValue({
            id: order.id,
            code: order.code,
            status: order.status,
            supplier: supplier,
            emissionDate: order.emissionDate.toDate(),
            estimatedDeliveryDate: order.estimatedDeliveryDate.toDate(),
            freightCost: order.freightCost,
          });
          this.status = order.status;

          this.items.clear();
          order.items.forEach((item: any) => {
            const product = this.products.find((p) => p.id === item.productId);
            const itemSupplier = this.suppliers.find(
              (s) => s.id === item.supplierId
            );
            const itemGroup = this.createItem();
            itemGroup.patchValue({
              product: product,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              freightCost: item.freightCost,
              supplier: itemSupplier,
            });
            this.items.push(itemGroup);
          });
          this.updateItemSupplierValidation();
          this.updateCalculations();
        }
      });
  }

  createItem(itemData?: any): FormGroup {
    const item = this.fb.group({
      product: [itemData?.product || null, Validators.required],
      quantity: [
        itemData?.quantity || 1,
        [Validators.required, Validators.min(1)],
      ],
      unitPrice: [
        itemData?.unitPrice || 0,
        [Validators.required, Validators.min(0)],
      ],
      itemSubtotal: [
        itemData?.itemSubtotal || 0,
        [Validators.required, Validators.min(0)],
      ],
      freightCost: [itemData?.freightCost || 0],
      totalPrice: [{ value: itemData?.totalPrice || 0, disabled: true }],
      supplier: [itemData?.supplier || null],
    });

    item.get('product')?.valueChanges.subscribe((product: Product) => {
      if (product) {
        const unitPrice = product.averageCost || 0;
        const quantity = item.get('quantity')?.value || 1;
        item.get('unitPrice')?.setValue(unitPrice, { emitEvent: false });
        item
          .get('itemSubtotal')
          ?.setValue(unitPrice * quantity, { emitEvent: false });
        this.updateCalculations();
      }
    });

    item.get('quantity')?.valueChanges.subscribe((quantity) => {
      const unitPrice = item.get('unitPrice')?.value || 0;
      item
        .get('itemSubtotal')
        ?.setValue(unitPrice * (quantity || 0), { emitEvent: false });
      this.updateCalculations();
    });

    item.get('unitPrice')?.valueChanges.subscribe((unitPrice) => {
      const quantity = item.get('quantity')?.value || 0;
      item
        .get('itemSubtotal')
        ?.setValue((unitPrice || 0) * quantity, { emitEvent: false });
      this.updateCalculations();
    });

    item.get('itemSubtotal')?.valueChanges.subscribe((subtotal) => {
      const quantity = item.get('quantity')?.value;
      if (quantity) {
        item
          .get('unitPrice')
          ?.setValue((subtotal || 0) / quantity, { emitEvent: false });
      }
      this.updateCalculations();
    });

    item
      .get('freightCost')
      ?.valueChanges.subscribe(() => this.updateCalculations());

    return item;
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
    this.updateItemSupplierValidation();
    this.updateCalculations();
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.updateCalculations();
  }

  goBack(): void {
    this.router.navigate(['/purchase-orders']);
  }

  onApprove(): void {
    if (!this.orderId) return;
    const formValue = this.form.getRawValue();
    const orderToApprove = this.reconstructOrderFromForm(formValue);

    this.purchaseOrderService
      .approvePurchaseOrder(orderToApprove)
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
      width: '800px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.suppliersSubject.next();
      }
    });
  }

  async onSave(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const orderToSave = this.reconstructOrderFromForm(formValue);

    try {
      if (this.isEditMode && this.orderId) {
        await this.purchaseOrderService.updatePurchaseOrder(
          this.orderId,
          orderToSave
        );
      } else {
        const { id, ...newOrder } = orderToSave;
        await this.purchaseOrderService.addPurchaseOrder(newOrder);
      }
      this.router.navigate(['/purchase-orders']);
    } catch (error) {
      console.error('Error saving purchase order:', error);
    }
  }

  public updateCalculations(): void {
    let orderSubtotal = 0;
    let totalItemFreight = 0;

    this.items.controls.forEach((itemControl) => {
      const item = itemControl as FormGroup;
      const itemSubtotal = item.get('itemSubtotal')?.value || 0;
      const itemFreight = item.get('freightCost')?.value || 0;

      // Total price per item now only includes its own freight for now
      // The distributed freight will be added below
      item
        .get('totalPrice')
        ?.setValue(itemSubtotal + itemFreight, { emitEvent: false });

      orderSubtotal += itemSubtotal;
      totalItemFreight += itemFreight;
    });

    const orderFreight = this.form.get('freightCost')?.value || 0;

    if (orderFreight > 0 && orderSubtotal > 0) {
      this.items.controls.forEach((itemControl) => {
        const item = itemControl as FormGroup;
        const quantity = item.get('quantity')?.value || 0;
        if (quantity === 0) return;

        const itemSubtotal = item.get('itemSubtotal')?.value || 0;

        const distributedFreight =
          (itemSubtotal / orderSubtotal) * orderFreight;
        const currentTotalPrice = item.get('totalPrice')?.value || 0;
        item
          .get('totalPrice')
          ?.setValue(currentTotalPrice + distributedFreight, {
            emitEvent: false,
          });
      });
    }

    const finalTotal = orderSubtotal + totalItemFreight + orderFreight;
    this.form.get('total')?.setValue(finalTotal, { emitEvent: false });
  }

  private reconstructOrderFromForm(formValue: any): PurchaseOrder {
    const orderToSave: Partial<PurchaseOrder> = {
      id: this.orderId ?? undefined,
      code: formValue.code,
      supplierId: formValue.supplier?.id,
      supplierName: formValue.supplier?.name,
      emissionDate: Timestamp.fromDate(formValue.emissionDate),
      estimatedDeliveryDate: Timestamp.fromDate(
        formValue.estimatedDeliveryDate
      ),
      status: formValue.status,
      freightCost: formValue.freightCost,
    };

    if (formValue.supplier) {
      orderToSave.supplierId = formValue.supplier.id;
      orderToSave.supplierName = formValue.supplier.name;
    }

    const orderSubtotal = formValue.items.reduce(
      (sum: number, i: any) => sum + (i.itemSubtotal || 0),
      0
    );

    orderToSave.items = formValue.items
      .map((item: any) => {
        if (!item.product) return null;

        const itemSubtotal = item.itemSubtotal || 0;

        let distributedFreight = 0;
        if (formValue.freightCost > 0 && orderSubtotal > 0) {
          distributedFreight =
            (itemSubtotal / orderSubtotal) * formValue.freightCost;
        }

        const totalItemCost =
          itemSubtotal + (item.freightCost || 0) + distributedFreight;
        const finalUnitCost =
          item.quantity > 0 ? totalItemCost / item.quantity : 0;

        const itemToSave: any = {
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          freightCost: item.freightCost || 0,
          totalPrice: totalItemCost,
          unitCost: finalUnitCost,
        };

        if (item.supplier) {
          itemToSave.supplierId = item.supplier.id;
          itemToSave.supplierName = item.supplier.name;
        }
        return itemToSave;
      })
      .filter((i: any) => i !== null);

    return orderToSave as PurchaseOrder;
  }

  updateItemSupplierValidation(): void {
    const isMarketplace = this.isMarketplace;
    this.items.controls.forEach((item) => {
      const supplierControl = item.get('supplier');
      if (isMarketplace) {
        supplierControl?.setValidators([Validators.required]);
      } else {
        supplierControl?.clearValidators();
      }
      supplierControl?.updateValueAndValidity();
    });
  }
}
