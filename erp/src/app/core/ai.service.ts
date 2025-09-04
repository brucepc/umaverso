import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAI, getGenerativeModel, GenerativeModel } from 'firebase/ai';

export interface SeoData {
  seoTitle: string;
  seoDescription: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private app: FirebaseApp = inject(FirebaseApp);
  private model: GenerativeModel;
  private storageBucket = 'umaverso.firebasestorage.app'; // Nome do seu bucket

  constructor() {
    const vertex = getAI(this.app);
    this.model = getGenerativeModel(vertex, { model: 'gemini-pro-vision' });
  }

  private convertToPublicUrl(url: string): string {
    if (!url) {
      return '';
    }
    try {
      const urlObject = new URL(url);
      const path = urlObject.pathname;
      const filePath = decodeURIComponent(path.substring(path.indexOf('/o/') + 3));
      return `https://storage.googleapis.com/${this.storageBucket}/${filePath}`;
    } catch (error) {
      console.error('URL inválida:', url, error);
      return url; // Retorna a original em caso de erro
    }
  }

  async generateSeoTextFromImage(imageUrl: string): Promise<SeoData> {
    const prompt = `
      Baseado nesta imagem de um produto, gere um título de SEO com no máximo 60 caracteres
      e uma meta descrição de SEO com no máximo 160 caracteres.
      A resposta deve ser um JSON válido com as chaves "seoTitle" e "seoDescription".
      Não inclua a formatação markdown ('''json) na resposta.
    `;

    const publicImageUrl = this.convertToPublicUrl(imageUrl);

    // Firebase SDK for web cannot directly handle remote URLs.
    // We need to fetch the image and convert it to a base64 string.
    const imagePart = await this.urlToGenerativePart(publicImageUrl, 'image/jpeg');

    const result = await this.model.generateContent([prompt, imagePart]);
    const response = result.response;
    const jsonString = response.text().replace(/```json\n?|```/g, '');

    try {
      const parsedJson = JSON.parse(jsonString);
      return parsedJson as SeoData;
    } catch (error) {
      console.error('Error parsing JSON from AI response:', error);
      throw new Error('Failed to parse SEO data from AI response.');
    }
  }

  private async urlToGenerativePart(url: string, mimeType: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${url}`);
    }
    const blob = await response.blob();
    const base64String = await this.blobToBase64(blob);
    return {
      inlineData: {
        data: base64String,
        mimeType,
      },
    };
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
