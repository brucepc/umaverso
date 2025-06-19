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


@Component({
  selector: 'app-customer-form-dialog',
  standalone: true,
  imports: [
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
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer | null,
    private customerService: CustomerService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nif: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      address: this.fb.group({
        street: [''],
        number: [''],
        complement: [''],
        zipCode: [''],
        city: [''],
        state: [''],
      }),
      isActive: [true],
    });

    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue(this.data);
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const customerData: Omit<Customer, 'id'> = this.form.value;

    const save$ = this.isEditMode
      ? this.customerService.updateCustomer({
          id: this.data!.id,
          ...customerData,
        })
      : this.customerService.addCustomer(customerData);

    save$.then(() => this.dialogRef.close(true));
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
