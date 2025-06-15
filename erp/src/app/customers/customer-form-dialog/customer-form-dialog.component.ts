import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from '@models/customer.model';
import { CustomerService } from '../customer.service';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './customer-form-dialog.component.html',
  styleUrls: ['./customer-form-dialog.component.scss']
})
export class CustomerFormDialogComponent {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private dialogRef = inject(MatDialogRef<CustomerFormDialogComponent>);
  private snackBar = inject(MatSnackBar);

  form: FormGroup;
  isEditMode: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data?: Customer) {
    this.isEditMode = !!data;

    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      document: [data?.document || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      phone: [data?.phone || ''],
      address: this.fb.group({
        street: [data?.address?.street || '', Validators.required],
        number: [data?.address?.number || '', Validators.required],
        complement: [data?.address?.complement || ''],
        zipCode: [data?.address?.zipCode || '', Validators.required],
        city: [data?.address?.city || '', Validators.required],
        state: [data?.address?.state || '', Validators.required],
      }),
      isActive: [data?.isActive ?? true]
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const customerData = this.form.value;
    const saveOperation = this.isEditMode && this.data
      ? this.customerService.updateCustomer({ ...this.data, ...customerData })
      : this.customerService.addCustomer(customerData);

    saveOperation.then(() => {
      this.snackBar.open(`Cliente ${this.isEditMode ? 'atualizado' : 'salvo'} com sucesso!`, 'Fechar', { duration: 3000 });
      this.dialogRef.close(true);
    }).catch(err => {
      console.error(err);
      this.snackBar.open(`Erro ao ${this.isEditMode ? 'atualizar' : 'salvar'} cliente.`, 'Fechar', { duration: 3000 });
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
