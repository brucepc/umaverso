import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ECommerceProductService } from '../ecommerce-product.service';
import { ECommerceProductDetails } from '@models/ecommerce-product-details.model';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-ecommerce-details-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './ecommerce-details-form.component.html',
  styleUrls: ['./ecommerce-details-form.component.scss'],
})
export class EcommerceDetailsFormComponent implements OnInit {
  @Input({ required: true }) productId!: string;

  private fb = inject(FormBuilder);
  private eCommerceProductService = inject(ECommerceProductService);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  eCommerceDetails$!: Observable<ECommerceProductDetails>;
  detailsId: string | null = null;

  ngOnInit(): void {
    this.form = this.fb.group({
      displayInOnlineStore: [false],
      onSale: [false],
      taxRate: [0],
      seoTitle: [''],
      seoDescription: [''],
    });

    this.eCommerceDetails$ = this.eCommerceProductService.findOrCreateDetails(this.productId);
    
    this.eCommerceDetails$.pipe(take(1)).subscribe(details => {
      this.detailsId = details.id;
      this.form.patchValue(details);
    });
  }

  onSave(): void {
    if (this.form.invalid || !this.detailsId) {
      return;
    }

    this.eCommerceProductService.updateDetails(this.detailsId, this.form.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.open('Detalhes de E-commerce salvos com sucesso!', 'Fechar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error saving e-commerce details:', err);
          this.snackBar.open('Erro ao salvar os detalhes.', 'Fechar', { duration: 3000 });
        }
      });
  }
}
