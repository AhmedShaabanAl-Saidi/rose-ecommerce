import { Route } from '@angular/router';
import { guestGuard } from '@elevate/auth-data-access';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./feature/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./feature/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/main-layout/main.routes').then((m) => m.mainRoutes),
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },

  {
  path: 'test-coupon',
  loadComponent: () =>
    import('./feature/products/coupon/component/coupon').then(m => m.CouponComponent)
}
];
