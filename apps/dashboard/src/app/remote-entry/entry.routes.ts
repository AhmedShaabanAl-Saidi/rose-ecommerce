import { Route } from '@angular/router';
import { DashboardLayoutComponent } from '../layout/dashboard-layout/dashboard-layout.component';
import { OverviewComponent } from '../features/overview/overview.component';
import { CategoriesComponent } from '../features/categories/categories.component';
import { OccasionsComponent } from '../features/occasions/occasions.component';
import { ProductsComponent } from '../features/products/products.component';
import { ProductAddComponent } from '../features/products/product-add/product-add.component';
import { ProductEditComponent } from '../features/products/product-edit/product-edit.component';
import { provideDashboardI18n } from '../core/i18n/dashboard-i18n.service';

export const remoteRoutes: Route[] = [
  {
    path: '',
    providers: [provideDashboardI18n()],
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: OverviewComponent,
        title: 'Dashboard - Overview',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Dashboard - Categories',
      },
      {
        path: 'occasions',
        component: OccasionsComponent,
        title: 'Dashboard - Occasions',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Dashboard - Products',
        children: [
          {
            path: 'add',
            component: ProductAddComponent,
            title: 'Dashboard - Add Product',
          },
          {
            path: 'edit',
            component: ProductEditComponent,
            title: 'Dashboard - Edit Product',
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@elevate/reusable-ui').then((m) => m.MyAccountComponent),
            title: 'Dashboard - My Account',
          },
          {
            path: 'change-password',
            loadComponent: () =>
              import('@elevate/reusable-ui').then(
                (m) => m.ChangePasswordComponent
              ),
            title: 'Dashboard - Change Password',
          },
        ],
      },
      {
        path: '**',
        loadComponent: () =>
          import('@elevate/reusable-ui').then((m) => m.NotFoundComponent),
        title: 'Dashboard - Page Not Found',
      },
    ],
  },
];
