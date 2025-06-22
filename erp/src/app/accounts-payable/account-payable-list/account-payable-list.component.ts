import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  AccountPayable,
  AccountPayableStatus,
} from '@models/account-payable.model';
import { Observable, tap } from 'rxjs';
import { AccountPayableService } from '../account-payable.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-account-payable-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  host: {
    class: 'page-list',
  },
  templateUrl: './account-payable-list.component.html',
  styleUrl: './account-payable-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPayableListComponent {
  private service = inject(AccountPayableService);
  private snackBar = inject(MatSnackBar);

  AccountPayableStatus = AccountPayableStatus;
  accounts$: Observable<AccountPayable[]> = this.service
    .getAccountsPayable()
    .pipe(tap((accounts) => (this.accounts.data = accounts)));
  accounts = new MatTableDataSource<AccountPayable>([]);
  displayedColumns: string[] = [
    'dueDate',
    'supplierName',
    'purchaseOrderCode',
    'totalAmount',
    'status',
    'actions',
  ];

  approve(id: string): void {
    this.service
      .approvePayable(id)
      .then(() => {
        this.snackBar.open('Conta aprovada para pagamento.', 'Fechar', {
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
        this.snackBar.open('Erro ao aprovar conta.', 'Fechar', {
          duration: 3000,
        });
      });
  }

  reject(id: string): void {
    this.service
      .rejectPayable(id)
      .then(() => {
        this.snackBar.open('Conta rejeitada.', 'Fechar', { duration: 3000 });
      })
      .catch((err) => {
        console.error(err);
        this.snackBar.open('Erro ao rejeitar conta.', 'Fechar', {
          duration: 3000,
        });
      });
  }
}
