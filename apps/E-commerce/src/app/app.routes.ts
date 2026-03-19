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
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
  path: 'test-coupon',
  loadComponent: () =>
    import('./feature/products/coupon/component/coupon').then(m => m.CouponComponent)
}
];
