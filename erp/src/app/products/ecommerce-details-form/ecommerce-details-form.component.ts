import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { VariationMapping } from '@models/ecommerce-product-details.model';
import { AiService } from 'app/core/ai.service';
import { take } from 'rxjs';
import { ECommerceProductService } from '../ecommerce-product.service';


@Component({
  selector: 'app-ecommerce-details-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './ecommerce-details-form.component.html',
  styleUrls: ['./ecommerce-details-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcommerceDetailsFormComponent implements OnInit {
  @Input() productId!: string;
  @Input() mainImageUrl: string | null = null;
  form!: FormGroup;

  isLoading = false;
  isGeneratingSeo = false;
  private eCommerceProductService = inject(ECommerceProductService);
  private fb = inject(FormBuilder);
  private aiService = inject(AiService);
  private snackBar = inject(MatSnackBar);


  ngOnInit(): void {
    this.form = this.fb.group({
      displayInOnlineStore: [false],
      onSale: [false],
      taxRate: [0],
      seoTitle: [''],
      seoDescription: [''],
      variations: this.fb.array([]),
    });

    this.loadDetails();
  }

  private loadDetails(): void {
    this.isLoading = true;
    this.eCommerceProductService.getDetailsByProductId(this.productId).pipe(take(1)).subscribe(details => {
      if (details) {
        this.form.patchValue(details);
        if (details.variations) {
          details.variations.forEach(v => this.addVariation(v));
        }
      }
      this.isLoading = false;
    });
  }

  get variations(): FormArray {
    return this.form.get('variations') as FormArray;
  }

  addVariation(variation: VariationMapping): void {
    this.variations.push(this.fb.group({
      variantId: [variation.variantId],
      option1: [variation.option1],
      option2: [variation.option2],
      option3: [variation.option3],
    }));
  }

  removeVariation(index: number): void {
    this.variations.removeAt(index);
  }

  async generateSeo(): Promise<void> {
    if (!this.mainImageUrl) {
      this.snackBar.open('É necessário ter uma imagem principal para gerar o SEO.', 'Fechar', { duration: 3000 });
      return;
    }

    this.isGeneratingSeo = true;
    try {
      const seoData = await this.aiService.generateSeoTextFromImage(this.mainImageUrl);
      this.form.patchValue({
        seoTitle: seoData.seoTitle,
        seoDescription: seoData.seoDescription
      });
      this.snackBar.open('Textos de SEO gerados com sucesso!', 'Fechar', { duration: 3000 });
    } catch (error) {
      console.error('Error generating SEO:', error);
      this.snackBar.open('Ocorreu um erro ao gerar os textos de SEO.', 'Fechar', { duration: 3000 });
    } finally {
      this.isGeneratingSeo = false;
    }
  }

  save(): void {
    if (this.form.valid) {
      this.eCommerceProductService.findOrCreateDetails(this.productId).pipe(take(1)).subscribe(details => {
        this.eCommerceProductService.updateDetails(details.id, this.form.value);
      });
    }
  }
}
