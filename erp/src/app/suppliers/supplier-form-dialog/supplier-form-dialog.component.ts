import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Supplier } from '@models/supplier.model';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './supplier-form-dialog.component.html',
  styleUrl: './supplier-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierFormDialogComponent {
  private fb = inject(FormBuilder);
  private supplierService = inject(SupplierService);
  public dialogRef = inject(MatDialogRef<SupplierFormDialogComponent>);
  private data: { supplier: Supplier } = inject(MAT_DIALOG_DATA);

  isEditMode = this.data?.supplier != null;

  form = this.fb.group({
    name: ['', Validators.required],
    nif: [''],
    email: ['', Validators.email],
    phone: [''],
    url: [''],
    address: this.fb.group({
      street: [''],
      number: [''],
      complement: [''],
      neighborhood: [''],
      city: [''],
      state: [''],
      zipCode: [''],
    }),
  });

  constructor() {
    if (this.isEditMode) {
      this.form.patchValue(this.data.supplier);
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const supplierData = {
      name: formValue.name ?? '',
      nif: formValue.nif ?? '',
      email: formValue.email ?? '',
      phone: formValue.phone ?? '',
      url: formValue.url ?? '',
      address: {
        street: formValue.address?.street ?? '',
        number: formValue.address?.number ?? '',
        complement: formValue.address?.complement ?? '',
        neighborhood: formValue.address?.neighborhood ?? '',
        city: formValue.address?.city ?? '',
        state: formValue.address?.state ?? '',
        zipCode: formValue.address?.zipCode ?? '',
      },
    };

    let saveOperation;

    if (this.isEditMode) {
      const supplierToUpdate = { ...this.data.supplier, ...supplierData };
      saveOperation = this.supplierService.updateSupplier(supplierToUpdate);
    } else {
      const newSupplier = { ...supplierData, isActive: true };
      saveOperation = this.supplierService.addSupplier(newSupplier);
    }

    saveOperation.then(() => this.dialogRef.close(true))
      .catch(error => console.error('Error saving supplier', error));
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 