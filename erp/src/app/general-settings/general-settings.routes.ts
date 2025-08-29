import { Routes } from '@angular/router';

export const GENERAL_SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./general-settings-list/general-settings-list.component').then(m => m.GeneralSettingsListComponent),
    title: 'Configurações Gerais'
  }
];
