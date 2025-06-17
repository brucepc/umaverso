import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Bem-vindo ao UMA ERP</mat-card-title>
        <mat-card-subtitle>Seu sistema de gestão integrada</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>
          Utilize o menu lateral para navegar entre os módulos de Categorias e Produtos.
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 600px;
      margin: 20px auto;
    }
  `]
})
export class DashboardComponent {} 