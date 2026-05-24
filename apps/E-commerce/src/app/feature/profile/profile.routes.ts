import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@elevate/reusable-ui').then((m) => m.MyAccountComponent),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('@elevate/reusable-ui').then((m) => m.ChangePasswordComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./components/profile-orders/profile-orders.component').then(
            (m) => m.ProfileOrdersComponent
          ),
      },
      {
        path: 'addresses',
        loadComponent: () =>
          import(
            './components/profile-addresses/profile-addresses.component'
          ).then((m) => m.ProfileAddressesComponent),
      },
    ],
  },
];
