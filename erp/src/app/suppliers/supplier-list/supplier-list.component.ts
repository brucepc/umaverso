import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Supplier } from '@models/supplier.model';
import { Observable } from 'rxjs';
import { SupplierFormDialogComponent } from '../supplier-form-dialog/supplier-form-dialog.component';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
  ],
  host: {
    class: 'page-list',
  },
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListComponent {
  private supplierService = inject(SupplierService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  suppliers$: Observable<Supplier[]> = this.supplierService.getSuppliers();
  displayedColumns: string[] = [
    'name',
    'nif',
    'email',
    'phone',
    'isActive',
    'actions',
  ];

  openSupplierDialog(supplier?: Supplier): void {
    const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
      minWidth: 800,
      data: { supplier },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Aqui podemos adicionar a lógica para atualizar a lista após fechar o dialog
    });
  }

  toggleSupplierStatus(supplier: Supplier): void {
    this.supplierService
      .updateSupplierStatus(supplier.id, !supplier.isActive)
      .then(() => {
        this.snackBar.open(
          `Fornecedor ${
            !supplier.isActive ? 'ativado' : 'desativado'
          } com sucesso.`,
          'Fechar',
          { duration: 3000 }
        );
      });
  }
}
