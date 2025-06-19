import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { Product, BomItem } from '@models/product.model';
import { CategoryService } from '../../categories/category.service';
import { ProductService } from '../product.service';
import { ProductType } from '@models/product-type.enum';
import { filter, take } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormDialogComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  public dialogRef = inject(MatDialogRef<ProductFormDialogComponent>);
  public data: Product = inject(MAT_DIALOG_DATA);

  form: FormGroup;
  categories$: Observable<Category[]>;
  rawMaterials$: Observable<Product[]>;
  isEdit = false;
  productTypeEnum = ProductType;
  productTypes = Object.values(ProductType);
  imageUrls: string[] = [];
  isUploading = false;

  constructor() {
    this.categories$ = this.categoryService.getCategories();
    this.rawMaterials$ = this.productService.getRawMaterials();

    this.form = this.fb.group({
      name: ['', Validators.required],
      sku: [''],
      category: [null, Validators.required],
      productType: [ProductType.Revenda, Validators.required],
      unitOfMeasure: ['', Validators.required],
      averageCost: [0, [Validators.required, Validators.min(0)]],
      salePrice: [0, [Validators.required, Validators.min(0)]],
      weight: [0, Validators.min(0)],
      size: [''],
      mainImageUrl: [''],
      bom: this.fb.array([]),
    });

    if (this.data) {
      this.isEdit = true;
      this.imageUrls = this.data.imageUrls || [];
      this.form.patchValue(this.data);
      this.categories$
        .pipe(
          filter((categories) => categories.length > 0),
          take(1)
        )
        .subscribe((categories) => {
          const selectedCategory = categories.find(
            (c) => c.id === this.data?.categoryId
          );
          if (selectedCategory) {
            this.form.get('category')?.setValue(selectedCategory);
          }
        });

      if (this.data.bom) {
        this.data.bom.forEach((item) => this.addBomItem(item));
      }
    }

    this.form.get('productType')?.valueChanges.subscribe((type) => {
      if (type !== ProductType.FabricoProprio) {
        this.bom.clear();
      }
    });
  }

  compareProductTypes(t1: ProductType, t2: ProductType): boolean {
    console.log(t1, t2);
    return t1 && t2 ? t1 === t2 : t1 === t2;
  }

  compareCategories(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  // Track by functions for ngFor directives
  trackByType(index: number, type: ProductType): ProductType {
    return type;
  }

  trackByCategory(index: number, category: Category): string {
    return category.id || '';
  }

  trackByProduct(index: number, product: Product): string {
    return product.id;
  }

  trackByBomItem(index: number): number {
    return index;
  }

  get bom() {
    return this.form.get('bom') as FormArray;
  }

  createBomItem(item?: BomItem): FormGroup {
    return this.fb.group({
      productId: [item?.productId || '', Validators.required],
      quantity: [
        item?.quantity || 1,
        [Validators.required, Validators.min(0.001)],
      ],
    });
  }

  addBomItem(item?: BomItem): void {
    this.bom.push(this.createBomItem(item));
  }

  removeBomItem(index: number): void {
    this.bom.removeAt(index);
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    this.isUploading = true;
    try {
      const imageUrl = await firstValueFrom(
        this.productService.uploadProductImage(file)
      );
      if (imageUrl) {
        this.imageUrls.push(imageUrl);
        // If this is the first image, set it as the main one.
        if (this.imageUrls.length === 1) {
          this.setMainImage(imageUrl);
        }
        // If we are editing an existing product, save the new image URL immediately.
        if (this.isEdit && this.data?.id) {
          const updatedProduct: Partial<Product> = {
            id: this.data.id,
            imageUrls: this.imageUrls,
            mainImageUrl: this.form.get('mainImageUrl')?.value,
          };
          // We don't need to wait for this to complete to update the UI
          this.productService.updateProduct(updatedProduct as Product);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Optionally, show a user-facing error message
    } finally {
      this.isUploading = false;
    }
  }

  removeImage(index: number): void {
    const removedUrl = this.imageUrls[index];
    this.imageUrls.splice(index, 1);

    // If the removed image was the main image, update the mainImageUrl.
    if (removedUrl === this.form.get('mainImageUrl')?.value) {
      const newMainImage = this.imageUrls.length > 0 ? this.imageUrls[0] : null;
      this.setMainImage(newMainImage);
    }

    if (this.isEdit && this.data?.id) {
      const updatedProduct: Partial<Product> = {
        id: this.data.id,
        imageUrls: this.imageUrls,
        mainImageUrl: this.form.get('mainImageUrl')?.value,
      };
      this.productService.updateProduct(updatedProduct as Product);
    }
  }

  setMainImage(url: string | null): void {
    this.form.get('mainImageUrl')?.setValue(url);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let productData = this.form.getRawValue();

    // If SKU is empty, generate a unique one based on the category prefix.
    if (!productData.sku) {
      const category = this.form.get('category')?.value as Category;
      const prefix = category?.prefix || 'SKU';
      productData.sku = `${prefix}-${Date.now()}`;
    }

    if (productData.productType !== ProductType.FabricoProprio) {
      productData.bom = [];
    }

    const productToSave: Omit<Product, 'id'> | Product = {
      ...this.data,
      ...productData,
      categoryId: productData.category.id,
      imageUrls: this.imageUrls,
      mainImageUrl: productData.mainImageUrl,
    };
    delete (productToSave as any).category;

    const save$ = this.isEdit
      ? this.productService.updateProduct(productToSave as Product)
      : this.productService.addProduct(productToSave as Omit<Product, 'id'>);

    save$.then(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
