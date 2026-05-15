import { Route } from '@angular/router';
import { DashboardLayoutComponent } from '../layout/dashboard-layout/dashboard-layout.component';
import { OverviewComponent } from '../pages/overview/overview.component';
import { CategoriesComponent } from '../pages/categories/categories.component';
import { OccasionsComponent } from '../pages/occasions/occasions.component';
import { ProductsComponent } from '../pages/products/products.component';

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
      },
    ],
  },
];
