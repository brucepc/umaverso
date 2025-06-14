import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto.model';

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
export class ProdutoFormDialogComponent {
  form: FormGroup;
  productTypes = ['MATERIA_PRIMA', 'PRODUTO_ACABADO', 'REVENDA'];
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProdutoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto
  ) {
    this.isEditMode = !!data;

    this.form = this.fb.group({
      id: [data?.id],
      sku: [data?.sku || '', Validators.required],
      name: [data?.name || '', Validators.required],
      productType: [data?.productType || '', Validators.required],
      unitOfMeasure: [data?.unitOfMeasure || '', Validators.required],
      salePrice: [data?.salePrice || null]
    });
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
