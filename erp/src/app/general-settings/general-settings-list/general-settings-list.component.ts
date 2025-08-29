import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { GeneralSettingsService } from '../../core/general-settings.service';
import { GeneralSettings, ProfitRules, CompanyInfo, SystemSettings, PriceCalculation } from '@models/general-settings.model';

@Component({
  selector: 'app-general-settings-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  host: {
    class: 'page-list',
  },
  templateUrl: './general-settings-list.component.html',
  styleUrls: ['./general-settings-list.component.scss']
})
export class GeneralSettingsListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private generalSettingsService = inject(GeneralSettingsService);
  private snackBar = inject(MatSnackBar);

  isSaving = false;
  previewCalculation: PriceCalculation | null = null;
  
  // Controle para o custo base da simulação
  simulationCostControl = new FormControl(100, [Validators.min(0)]);

  // Formulários separados para cada seção
  profitRulesForm: FormGroup = this.fb.group({
    minProfitPercentage: [200, [Validators.required, Validators.min(0)]],
    recommendedProfitPercentage: [300, [Validators.required, Validators.min(0)]],
    vatPercentage: [23, [Validators.required, Validators.min(0)]]
  });

  companyForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    nif: [''],
    address: [''],
    phone: [''],
    email: ['', Validators.email],
    website: ['']
  });

  systemForm: FormGroup = this.fb.group({
    defaultPaymentTermDays: [30, [Validators.required, Validators.min(1)]],
    currencyCode: ['EUR', Validators.required]
  });

  ngOnInit() {
    this.loadSettings();
    this.setupPreviewCalculation();
  }

  /**
   * Carrega as configurações existentes
   */
  async loadSettings() {
    try {
      const settings = await this.generalSettingsService.loadSettings();
      if (settings) {
        this.populateForms(settings);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      this.snackBar.open('Erro ao carregar configurações', 'Fechar', { duration: 3000 });
    }
  }

  /**
   * Popula os formulários com as configurações carregadas
   */
  private populateForms(settings: GeneralSettings) {
    // Regras de lucro
    this.profitRulesForm.patchValue(settings.profitRules);
    
    // Informações da empresa
    this.companyForm.patchValue(settings.companyInfo);
    
    // Configurações do sistema
    this.systemForm.patchValue(settings.systemSettings);
    
    // Forçar atualização da preview após popular o formulário
    setTimeout(() => {
      this.updatePreviewCalculation();
    }, 100);
  }

  /**
   * Configura a pré-visualização dos cálculos
   */
  private setupPreviewCalculation() {
    // Atualizar preview quando mudarem os valores do formulário de lucro
    this.profitRulesForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updatePreviewCalculation();
    });

    // Atualizar preview quando mudarem o custo base da simulação
    this.simulationCostControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updatePreviewCalculation();
    });

    // Calcular inicialmente
    this.updatePreviewCalculation();
  }

  /**
   * Atualiza a pré-visualização dos cálculos
   */
  private updatePreviewCalculation() {
    const formValue = this.profitRulesForm.value;
    const simulationCost = Number(this.simulationCostControl.value) || 100;
    
    // Verificar se tem valores válidos (não apenas se o form é válido)
    const hasValidValues = 
      formValue.minProfitPercentage != null && formValue.minProfitPercentage >= 0 &&
      formValue.recommendedProfitPercentage != null && formValue.recommendedProfitPercentage >= 0 &&
      formValue.vatPercentage != null && formValue.vatPercentage >= 0 &&
      simulationCost > 0;
    
    if (hasValidValues) {
      const testRules: ProfitRules = {
        minProfitPercentage: Number(formValue.minProfitPercentage) || 0,
        recommendedProfitPercentage: Number(formValue.recommendedProfitPercentage) || 0,
        vatPercentage: Number(formValue.vatPercentage) || 0
      };

      // Calcular usando o custo definido pelo usuário
      this.previewCalculation = this.calculatePreview(simulationCost, testRules);
    } else {
      this.previewCalculation = null;
    }
  }

  /**
   * Simula o cálculo de preços (sem usar o serviço para evitar dependências)
   */
  private calculatePreview(cost: number, rules: ProfitRules): PriceCalculation {
    const minProfitAmount = cost * (rules.minProfitPercentage / 100);
    const recommendedProfitAmount = cost * (rules.recommendedProfitPercentage / 100);
    
    const priceMinWithoutVat = cost + minProfitAmount;
    const priceRecommendedWithoutVat = cost + recommendedProfitAmount;
    
    const vatAmountRecommended = priceRecommendedWithoutVat * (rules.vatPercentage / 100);
    
    const minSalePrice = priceMinWithoutVat + (priceMinWithoutVat * (rules.vatPercentage / 100));
    const recommendedSalePrice = priceRecommendedWithoutVat + vatAmountRecommended;
    
    return {
      averageCost: cost,
      minSalePrice: Number(minSalePrice.toFixed(2)),
      recommendedSalePrice: Number(recommendedSalePrice.toFixed(2)),
      minProfitAmount: Number(minProfitAmount.toFixed(2)),
      recommendedProfitAmount: Number(recommendedProfitAmount.toFixed(2)),
      vatAmount: Number(vatAmountRecommended.toFixed(2))
    };
  }

  /**
   * Salva as regras de lucro
   */
  async saveProfitRules() {
    if (this.profitRulesForm.valid) {
      this.isSaving = true;
      try {
        const profitRules: ProfitRules = this.profitRulesForm.value;
        await this.generalSettingsService.updateProfitRules(profitRules);
        
        this.snackBar.open('Regras de lucro salvas com sucesso!', 'Fechar', { 
          duration: 3000,
          panelClass: ['success-snack']
        });
      } catch (error) {
        console.error('Erro ao salvar regras de lucro:', error);
        this.snackBar.open('Erro ao salvar regras de lucro', 'Fechar', { 
          duration: 5000,
          panelClass: ['error-snack']
        });
      } finally {
        this.isSaving = false;
      }
    }
  }

  /**
   * Salva as informações da empresa
   */
  async saveCompanyInfo() {
    if (this.companyForm.valid) {
      this.isSaving = true;
      try {
        const currentSettings = this.generalSettingsService.getCurrentSettings();
        if (!currentSettings) {
          throw new Error('Configurações não carregadas');
        }

        const updatedSettings = {
          ...currentSettings,
          companyInfo: this.companyForm.value as CompanyInfo
        };

        await this.generalSettingsService.saveSettings(updatedSettings);
        
        this.snackBar.open('Informações da empresa salvas com sucesso!', 'Fechar', { 
          duration: 3000,
          panelClass: ['success-snack']
        });
      } catch (error) {
        console.error('Erro ao salvar informações da empresa:', error);
        this.snackBar.open('Erro ao salvar informações da empresa', 'Fechar', { 
          duration: 5000,
          panelClass: ['error-snack']
        });
      } finally {
        this.isSaving = false;
      }
    }
  }

  /**
   * Salva as configurações do sistema
   */
  async saveSystemSettings() {
    if (this.systemForm.valid) {
      this.isSaving = true;
      try {
        const currentSettings = this.generalSettingsService.getCurrentSettings();
        if (!currentSettings) {
          throw new Error('Configurações não carregadas');
        }

        const updatedSettings = {
          ...currentSettings,
          systemSettings: this.systemForm.value as SystemSettings
        };

        await this.generalSettingsService.saveSettings(updatedSettings);
        
        this.snackBar.open('Configurações do sistema salvas com sucesso!', 'Fechar', { 
          duration: 3000,
          panelClass: ['success-snack']
        });
      } catch (error) {
        console.error('Erro ao salvar configurações do sistema:', error);
        this.snackBar.open('Erro ao salvar configurações do sistema', 'Fechar', { 
          duration: 5000,
          panelClass: ['error-snack']
        });
      } finally {
        this.isSaving = false;
      }
    }
  }

  /**
   * Restaura valores padrão nas regras de lucro
   */
  resetToDefault() {
    this.profitRulesForm.patchValue({
      minProfitPercentage: 200,
      recommendedProfitPercentage: 300,
      vatPercentage: 23
    });
    
    this.snackBar.open('Valores restaurados para o padrão', 'Fechar', { duration: 2000 });
  }
}
