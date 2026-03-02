import { Route } from '@angular/router';
import { guestGuard } from '@elevate/auth-data-access';
import { ProductList } from './feature/home/pages/product/component/product-list/product.list';
import { ProductDetailsComponent } from './feature/home/pages/product/component/product-details/product.details';

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
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path:'products',component:ProductList
  },
  {
    path: 'products-details/:id',component:ProductDetailsComponent
  }
];
