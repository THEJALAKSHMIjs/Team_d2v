import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'stayclub/:property', loadComponent: () => import('./pages/stayclub-property/stayclub-property.component').then(m => m.StayclubPropertyComponent) },
  { path: 'hotel/:name', loadComponent: () => import('./pages/hotel-detail/hotel-detail.component').then(m => m.HotelDetailComponent) },
  { path: '**', redirectTo: '' }
];
