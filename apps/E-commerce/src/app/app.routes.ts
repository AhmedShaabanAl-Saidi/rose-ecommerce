import { Route } from '@angular/router';
import { Home } from './feature/home/home';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
];
