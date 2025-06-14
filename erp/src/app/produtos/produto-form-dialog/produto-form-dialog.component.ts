import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../categories/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produto-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './produto-form-dialog.component.html',
  styleUrl: './produto-form-dialog.component.scss'
})
export class ProdutoFormDialogComponent implements OnInit {
  form: FormGroup;
  productTypes = ['MATERIA_PRIMA', 'PRODUTO_ACABADO', 'REVENDA'];
  isEditMode: boolean;
  categories$!: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ProdutoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto
  ) {
    this.isEditMode = !!data;

    this.form = this.fb.group({
      id: [data?.id],
      categoryId: [data?.categoryId || '', Validators.required],
      sku: [data?.sku || '', Validators.required],
      name: [data?.name || '', Validators.required],
      productType: [data?.productType || '', Validators.required],
      unitOfMeasure: [data?.unitOfMeasure || '', Validators.required],
      salePrice: [data?.salePrice || null]
    });
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
