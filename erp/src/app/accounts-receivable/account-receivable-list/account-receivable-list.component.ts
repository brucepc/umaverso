import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { AccountReceivable } from '@models/account-receivable.model';
import { Observable } from 'rxjs';
import { AccountReceivableService } from '../account-receivable.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-receivable-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatCardModule,
  ],
  host: {
    class: 'page-list'
  },
  templateUrl: './account-receivable-list.component.html',
  styleUrl: './account-receivable-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountReceivableListComponent {
  private service = inject(AccountReceivableService);
  private snackBar = inject(MatSnackBar);

  accounts$: Observable<AccountReceivable[]> = this.service.getAccountsReceivable();
  displayedColumns: string[] = [
    'dueDate',
    'customerName',
    'totalAmount',
    'salesOrderCode',
    'status',
  ];

  togglePayment(account: AccountReceivable): void {
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