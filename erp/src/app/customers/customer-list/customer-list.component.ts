import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Customer } from '@models/customer.model';
import { CustomerService } from '../customer.service';
import { CustomerFormDialogComponent } from '../customer-form-dialog/customer-form-dialog.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  private customerService = inject(CustomerService);
  private dialog = inject(MatDialog);

  customers$: Observable<Customer[]> = this.customerService.getCustomers();
  displayedColumns: string[] = ['name', 'document', 'email', 'phone', 'city', 'actions'];

  addCustomer(): void {
    this.dialog.open(CustomerFormDialogComponent, {
      width: '600px',
      disableClose: true
    });
  }
  
  editCustomer(customer: Customer): void {
    this.dialog.open(CustomerFormDialogComponent, {
      width: '600px',
      disableClose: true,
      data: customer
    });
  }
}
