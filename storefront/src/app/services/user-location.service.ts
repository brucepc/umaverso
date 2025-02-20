import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  private countrySignal = signal<string>('pt');

  constructor() {
    this.getUserCountry();
  }

  getCountry() {
    return this.countrySignal.asReadonly();
  }

  private getUserCountry() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getCountryFromCoordinates(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.warn("Erro ao obter a localização:", error);
          console.warn("Usando PT como padrão.");
        }
      );
    } else {
      console.warn("Geolocalização não suportada pelo navegador. Usando PT como padrão.");
    }
  }

  private getCountryFromCoordinates(latitude: number, longitude: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(url)
      .then(response => response.json())
      .then(data => data.address.country)
      .then(country => this.countrySignal.set(country))
      .catch(error => {
        console.error('Erro ao buscar o país:', error);
        console.warn("Usando PT como padrão.");
      });
  }
}
