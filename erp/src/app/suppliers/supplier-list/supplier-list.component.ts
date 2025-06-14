import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Supplier } from '@models/supplier.model';
import { Observable, of } from 'rxjs';
import { SupplierService } from '../supplier.service';
import { SupplierFormDialogComponent } from '../supplier-form-dialog/supplier-form-dialog.component';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListComponent {
  private supplierService = inject(SupplierService);
  private dialog = inject(MatDialog);

  suppliers$: Observable<Supplier[]> = this.supplierService.getSuppliers();
  displayedColumns: string[] = ['name', 'nif', 'email', 'phone', 'actions'];

  openSupplierDialog(supplier?: Supplier): void {
    const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
      width: '800px',
      data: { supplier },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Aqui podemos adicionar a lógica para atualizar a lista após fechar o dialog
    });
  }
} 