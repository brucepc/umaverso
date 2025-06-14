import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { Product, BomItem } from '@models/product.model';
import { CategoryService } from '../../categories/category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product-form-dialog.component.html',
})
export class ProductFormDialogComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  public dialogRef = inject(MatDialogRef<ProductFormDialogComponent>);
  
  @Inject(MAT_DIALOG_DATA) public data?: Product;

  form: FormGroup;
  categories$: Observable<Category[]>;
  rawMaterials$: Observable<Product[]>;
  isEdit = !!this.data;
  productTypes: Product['productType'][] = ['MATERIA_PRIMA', 'PRODUTO_ACABADO', 'REVENDA'];

  constructor() {
    this.categories$ = this.categoryService.getCategories();
    this.rawMaterials$ = this.productService.getRawMaterials();

    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      sku: [this.data?.sku || '', Validators.required],
      categoryId: [this.data?.categoryId || '', Validators.required],
      productType: [this.data?.productType || 'REVENDA', Validators.required],
      unitOfMeasure: [this.data?.unitOfMeasure || '', Validators.required],
      averageCost: [this.data?.averageCost || 0, [Validators.required, Validators.min(0)]],
      salePrice: [this.data?.salePrice || 0, [Validators.required, Validators.min(0)]],
      bom: this.fb.array([])
    });

    if (this.isEdit && this.data?.bom) {
      this.data.bom.forEach(item => this.addBomItem(item));
    }

    this.form.get('productType')?.valueChanges.subscribe(type => {
      if (type !== 'PRODUTO_ACABADO') {
        this.bom.clear();
      }
    });
  }

  get bom() {
    return this.form.get('bom') as FormArray;
  }

  createBomItem(item?: BomItem): FormGroup {
    return this.fb.group({
      productId: [item?.productId || '', Validators.required],
      quantity: [item?.quantity || 1, [Validators.required, Validators.min(0.001)]]
    });
  }
  
  addBomItem(item?: BomItem): void {
    this.bom.push(this.createBomItem(item));
  }

  removeBomItem(index: number): void {
    this.bom.removeAt(index);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    let productData = this.form.getRawValue();

    if (productData.productType !== 'PRODUTO_ACABADO') {
      productData.bom = []; // Ensure bom is an empty array or handled as needed
    }
    
    const productToSave = {
      ...this.data,
      ...productData
    };

    const save$ = this.isEdit
      ? this.productService.updateProduct(productToSave)
      : this.productService.addProduct(productToSave);

    save$.then(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
