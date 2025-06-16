import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountPayable } from '@models/account-payable.model';
import { Observable } from 'rxjs';
import { AccountPayableService } from '../account-payable.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  ],
  host: {
    class: 'page-list'
  },
  templateUrl: './account-payable-list.component.html',
  styleUrl: './account-payable-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPayableListComponent {
  private service = inject(AccountPayableService);
  private snackBar = inject(MatSnackBar);

  accounts$: Observable<AccountPayable[]> = this.service.getAccountsPayable();
  displayedColumns: string[] = [
    'dueDate',
    'supplierName',
    'totalAmount',
    'purchaseOrderCode',
    'status',
  ];

  togglePayment(account: AccountPayable): void {
    const newStatus = account.status === 'Aberta' ? 'Liquidada' : 'Aberta';
    this.service.updatePaymentStatus(account.id, newStatus)
      .then(() => {
        this.snackBar.open('Status de pagamento atualizado.', 'Fechar', { duration: 3000 });
      })
      .catch(err => {
        console.error(err);
        this.snackBar.open('Erro ao atualizar status.', 'Fechar', { duration: 3000 });
      });
  }
} 