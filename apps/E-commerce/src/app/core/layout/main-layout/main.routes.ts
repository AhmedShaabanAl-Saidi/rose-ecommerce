import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('../../../feature/home/home').then((m) => m.Home),
      },
    ],
  },
];
