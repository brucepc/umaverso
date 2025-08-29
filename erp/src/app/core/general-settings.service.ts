import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp
} from '@angular/fire/firestore';
import { GeneralSettings, ProfitRules, PriceCalculation } from '@models/general-settings.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {
  private firestore: Firestore = inject(Firestore);
  private readonly SETTINGS_DOC_ID = 'app-settings';
  
  // Cache das configurações em memória
  private settingsSubject = new BehaviorSubject<GeneralSettings | null>(null);
  public settings$ = this.settingsSubject.asObservable();

  constructor() {
    this.loadSettings();
  }

  /**
   * Carrega as configurações do Firestore
   */
  async loadSettings(): Promise<GeneralSettings | null> {
    try {
      const settingsRef = doc(this.firestore, `generalSettings/${this.SETTINGS_DOC_ID}`);
      const settingsSnap = await getDoc(settingsRef);
      
      if (settingsSnap.exists()) {
        const settings = { id: settingsSnap.id, ...settingsSnap.data() } as GeneralSettings;
        this.settingsSubject.next(settings);
        return settings;
      } else {
        // Criar configurações padrão
        const defaultSettings = this.createDefaultSettings();
        await this.saveSettings(defaultSettings);
        return defaultSettings;
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      return null;
    }
  }

  /**
   * Salva as configurações no Firestore
   */
  async saveSettings(settings: Omit<GeneralSettings, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const settingsRef = doc(this.firestore, `generalSettings/${this.SETTINGS_DOC_ID}`);
      const existingDoc = await getDoc(settingsRef);
      
      if (existingDoc.exists()) {
        // Atualizar documento existente
        await updateDoc(settingsRef, {
          ...settings,
          updatedAt: serverTimestamp()
        });
      } else {
        // Criar novo documento
        await setDoc(settingsRef, {
          ...settings,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      // Recarregar configurações
      await this.loadSettings();
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      throw error;
    }
  }

  /**
   * Atualiza apenas as regras de lucro
   */
  async updateProfitRules(profitRules: ProfitRules): Promise<void> {
    const currentSettings = this.settingsSubject.value;
    if (!currentSettings) {
      throw new Error('Configurações não carregadas');
    }

    const updatedSettings = {
      ...currentSettings,
      profitRules
    };

    await this.saveSettings(updatedSettings);
  }

  /**
   * Obtém as configurações atuais (síncrono)
   */
  getCurrentSettings(): GeneralSettings | null {
    return this.settingsSubject.value;
  }

  /**
   * Calcula preços baseado nas regras de lucro configuradas
   */
  calculatePrices(averageCost: number): PriceCalculation {
    const settings = this.getCurrentSettings();
    
    if (!settings) {
      // Valores padrão se não houver configurações
      return this.calculatePricesWithRules(averageCost, {
        minProfitPercentage: 200,
        recommendedProfitPercentage: 300,
        vatPercentage: 23
      });
    }

    return this.calculatePricesWithRules(averageCost, settings.profitRules);
  }

  /**
   * Calcula preços com regras específicas
   */
  private calculatePricesWithRules(averageCost: number, rules: ProfitRules): PriceCalculation {
    const cost = Number(averageCost) || 0;
    
    // Calcular lucros
    const minProfitAmount = cost * (rules.minProfitPercentage / 100);
    const recommendedProfitAmount = cost * (rules.recommendedProfitPercentage / 100);
    
    // Preços sem IVA
    const priceMinWithoutVat = cost + minProfitAmount;
    const priceRecommendedWithoutVat = cost + recommendedProfitAmount;
    
    // Calcular IVA
    const vatAmountMin = priceMinWithoutVat * (rules.vatPercentage / 100);
    const vatAmountRecommended = priceRecommendedWithoutVat * (rules.vatPercentage / 100);
    
    // Preços finais com IVA
    const minSalePrice = priceMinWithoutVat + vatAmountMin;
    const recommendedSalePrice = priceRecommendedWithoutVat + vatAmountRecommended;
    
    return {
      averageCost: cost,
      minSalePrice: Number(minSalePrice.toFixed(2)),
      recommendedSalePrice: Number(recommendedSalePrice.toFixed(2)),
      minProfitAmount: Number(minProfitAmount.toFixed(2)),
      recommendedProfitAmount: Number(recommendedProfitAmount.toFixed(2)),
      vatAmount: Number(vatAmountRecommended.toFixed(2)) // IVA do preço recomendado
    };
  }

  /**
   * Cria configurações padrão
   */
  private createDefaultSettings(): GeneralSettings {
    return {
      id: this.SETTINGS_DOC_ID,
      companyInfo: {
        name: 'Minha Empresa Lda.',
        nif: '',
        address: '',
        phone: '',
        email: '',
        website: ''
      },
      profitRules: {
        minProfitPercentage: 200,      // 200% de lucro mínimo
        recommendedProfitPercentage: 300, // 300% de lucro recomendado
        vatPercentage: 23              // 23% IVA (padrão Portugal)
      },
      systemSettings: {
        defaultPaymentTermDays: 30,
        currencyCode: 'EUR',
        dateFormat: 'DD/MM/YYYY',
        numberFormat: '1.234,56'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
