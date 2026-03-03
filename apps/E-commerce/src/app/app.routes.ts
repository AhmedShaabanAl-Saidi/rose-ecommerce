import { Route } from '@angular/router';
import { guestGuard } from '@elevate/auth-data-access';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/main-layout/main.routes').then((m) => m.mainRoutes),
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./feature/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'products',
    loadComponent: () =>
      import(
        './feature/home/pages/product/component/product-list/product.list'
      ).then((m) => m.ProductList),
  },
  {
    path: 'products-details/:id',
    loadComponent: () =>
      import(
        './feature/home/pages/product/component/product-details/product.details'
      ).then((m) => m.ProductDetailsComponent),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
