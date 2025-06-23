import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

import { CategoryService } from '../../categories/category.service';
import { Category } from '@models/category.model';
import { Product, BomItem } from '@models/product.model';
import { ProductService } from '../product.service';
import { ProductType } from '@models/product-type.enum';

interface ImageForUpload {
  file: File;
  previewUrl: string;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    NgSelectModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  isEditMode = false;
  private productId: string | null = null;

  categories$: Observable<Category[]>;
  rawMaterials$: Observable<Product[]>;

  productTypeValues: string[] = Object.values(ProductType);
  productTypeEnum = ProductType;

  existingImageUrls: string[] = [];
  newImagesForUpload: ImageForUpload[] = [];
  isUploading = false;

  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  products$!: Observable<Product[]>;

  private initialImageUrls: string[] = [];

  get allImageUrls(): string[] {
    return [...this.existingImageUrls, ...this.newImagesForUpload.map(i => i.previewUrl)];
  }

  constructor() {
    this.categories$ = this.categoryService.getCategories();
    this.rawMaterials$ = this.productService.getRawMaterials();
  }

  ngOnInit(): void {
    this.initForm();
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode) {
      this.loadProductData(this.productId as string);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      sku: [''],
      description: [''],
      categoryId: ['', Validators.required],
      category: [null, Validators.required],
      productType: [ProductType.Revenda, Validators.required],
      unitOfMeasure: ['', Validators.required],
      ncm: [''],
      currentStock: [0, Validators.required],
      averageCost: [{ value: 0, disabled: true }],
      salePrice: [0, [Validators.required, Validators.min(0)]],
      isActive: [true],
      weight: [0, Validators.min(0)],
      size: [''],
      mainImageUrl: [''],
      imageUrls: this.fb.array([]),
      bom: this.fb.array([])
    });

    this.form.get('productType')?.valueChanges.subscribe((type) => {
      this.updateBomValidation(type);
    });
  }

  get bom(): FormArray {
    return this.form.get('bom') as FormArray;
  }

  createBomItem(item?: BomItem): FormGroup {
    return this.fb.group({
      productId: [item?.productId || '', Validators.required],
      quantity: [item?.quantity || 1, [Validators.required, Validators.min(0.001)]],
    });
  }

  addBomItem(item?: BomItem): void {
    this.bom.push(this.createBomItem(item));
  }

  removeBomItem(index: number): void {
    this.bom.removeAt(index);
  }

  updateBomValidation(type: ProductType): void {
    if (type === ProductType.FabricoProprio) {
      this.bom.setValidators([Validators.required, Validators.minLength(1)]);
    } else {
      this.bom.clearValidators();
      this.bom.clear();
    }
    this.bom.updateValueAndValidity();
  }

  loadProductData(id: string): void {
    this.productService.getProductById(id).pipe(take(1)).subscribe((product) => {
      if (product) {
        this.existingImageUrls = product.imageUrls || [];
        this.categories$.pipe(
            filter(categories => categories.length > 0),
            take(1)
        ).subscribe(categories => {
            const category = categories.find(c => c.id === product.categoryId);
            this.form.patchValue({ ...product, category: category });
            if (product.bom) {
                this.bom.clear();
                product.bom.forEach(item => this.addBomItem(item));
            }
            this.updateBomValidation(product.productType);
        });
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    
    const file = input.files[0];
    const newImage: ImageForUpload = {
      file: file,
      previewUrl: URL.createObjectURL(file)
    };
    this.newImagesForUpload.push(newImage);

    if (this.allImageUrls.length === 1) {
      this.setMainImage(newImage.previewUrl);
    }
    input.value = ''; 
  }

  removeImage(index: number): void {
    const removedUrl = this.allImageUrls[index];

    const newImageIndex = this.newImagesForUpload.findIndex(i => i.previewUrl === removedUrl);
    if (newImageIndex > -1) {
      URL.revokeObjectURL(removedUrl);
      this.newImagesForUpload.splice(newImageIndex, 1);
    } else {
      const existingIndex = this.existingImageUrls.indexOf(removedUrl);
      if (existingIndex > -1) {
        this.existingImageUrls.splice(existingIndex, 1);
      }
    }

    if (removedUrl === this.form.get('mainImageUrl')?.value) {
      this.setMainImage(this.allImageUrls.length > 0 ? this.allImageUrls[0] : null);
    }
  }

  setMainImage(url: string | null): void {
    this.form.get('mainImageUrl')?.setValue(url);
  }

  compareCategories(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  
  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.isUploading = true;

    try {
      const uploadPromises = this.newImagesForUpload.map(image =>
        firstValueFrom(this.productService.uploadProductImage(image.file))
      );
      const newImageUrls = await Promise.all(uploadPromises);
      
      const finalImageUrls = [...this.existingImageUrls, ...newImageUrls];
      
      const mainImageUrlControl = this.form.get('mainImageUrl');
      const currentMainImageUrl = mainImageUrlControl?.value;
      const mainImageAsNew = this.newImagesForUpload.find(i => i.previewUrl === currentMainImageUrl);
      
      let finalMainImageUrl = currentMainImageUrl;
      if (mainImageAsNew) {
        const newImageIndex = this.newImagesForUpload.indexOf(mainImageAsNew);
        finalMainImageUrl = newImageUrls[newImageIndex];
      } else if (!finalMainImageUrl && finalImageUrls.length > 0) {
        finalMainImageUrl = finalImageUrls[0];
      }

      let productData = this.form.getRawValue();
      if (!productData.sku) {
        const category = this.form.get('category')?.value as Category;
        productData.sku = `${category.name.substring(0, 3).toUpperCase()}-${Date.now()}`;
      }
      
      productData.categoryId = productData.category.id;
      productData.categoryName = productData.category.name;
      delete productData.category;

      productData.imageUrls = finalImageUrls;
      productData.mainImageUrl = finalMainImageUrl;

      if (this.isEditMode && this.productId) {
        await this.productService.updateProduct({ ...productData, id: this.productId });
        this.snackBar.open('Produto atualizado com sucesso!', 'Fechar', { duration: 3000 });
      } else {
        await this.productService.addProduct(productData);
        this.snackBar.open('Produto adicionado com sucesso!', 'Fechar', { duration: 3000 });
      }
      this.router.navigate(['/products']);
    } catch (error) {
      console.error(error);
      this.snackBar.open('Erro ao salvar o produto.', 'Fechar', { duration: 3000 });
    } finally {
      this.isUploading = false;
      this.newImagesForUpload.forEach(i => URL.revokeObjectURL(i.previewUrl));
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
