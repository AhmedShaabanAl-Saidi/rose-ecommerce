import { Route } from '@angular/router';
import { DashboardLayoutComponent } from '../layout/dashboard-layout/dashboard-layout.component';
import { OverviewComponent } from '../pages/overview/overview.component';
import { CategoriesComponent } from '../pages/categories/categories.component';
import { OccasionsComponent } from '../pages/occasions/occasions.component';
import { ProductsComponent } from '../pages/products/products.component';
import { ProductAddComponent } from '../pages/products/product-add/product-add.component';
import { ProductEditComponent } from '../pages/products/product-edit/product-edit.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
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
        title: 'Dashboard – Overview',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Dashboard – Categories',
      },
      {
        path: 'occasions',
        component: OccasionsComponent,
        title: 'Dashboard – Occasions',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Dashboard – Products',
        children: [
          {
            path: 'add',
            component: ProductAddComponent,
            title: 'Dashboard – Add Product',
          },
          {
            path: 'edit',
            component: ProductEditComponent,
            title: 'Dashboard – Edit Product',
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
            title: 'Dashboard – My Account',
          },
          {
            path: 'change-password',
            loadComponent: () =>
              import('@elevate/reusable-ui').then(
                (m) => m.ChangePasswordComponent
              ),
            title: 'Dashboard – Change Password',
          },
        ],
      },
      {
        path: '**',
        loadComponent: () =>
          import('@elevate/reusable-ui').then((m) => m.NotFoundComponent),
        title: 'Dashboard – Page Not Found',
      },
    ],
  },
];
