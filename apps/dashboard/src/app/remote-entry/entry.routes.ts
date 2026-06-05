import { Route } from '@angular/router';
import { DashboardLayoutComponent } from '../layout/dashboard-layout/dashboard-layout.component';
import { OverviewComponent } from '../features/overview/overview.component';
import { CategoriesComponent } from '../features/categories/categories.component';
import { OccasionsComponent } from '../features/occasions/occasions.component';
import { ProductsComponent } from '../features/products/products.component';
import { CatalogFormPageComponent } from '../features/catalog-form-page/catalog-form-page.component';
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
        path: 'categories/add',
        component: CatalogFormPageComponent,
        data: { entityType: 'categories', mode: 'add' },
        title: 'Dashboard - Add Category',
      },
      {
        path: 'categories/edit/:id',
        component: CatalogFormPageComponent,
        data: { entityType: 'categories', mode: 'edit' },
        title: 'Dashboard - Edit Category',
      },
      {
        path: 'occasions',
        component: OccasionsComponent,
        title: 'Dashboard - Occasions',
      },
      {
        path: 'occasions/add',
        component: CatalogFormPageComponent,
        data: { entityType: 'occasions', mode: 'add' },
        title: 'Dashboard - Add Occasion',
      },
      {
        path: 'occasions/edit/:id',
        component: CatalogFormPageComponent,
        data: { entityType: 'occasions', mode: 'edit' },
        title: 'Dashboard - Edit Occasion',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Dashboard - Products',
      },
      {
        path: 'products/add',
        component: CatalogFormPageComponent,
        data: { entityType: 'products', mode: 'add' },
        title: 'Dashboard - Add Product',
      },
      {
        path: 'products/edit/:id',
        component: CatalogFormPageComponent,
        data: { entityType: 'products', mode: 'edit' },
        title: 'Dashboard - Edit Product',
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
