import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Subscription, filter, merge } from 'rxjs';
import { AppearanceControlsComponent } from '../appearance-controls/appearance-controls.component';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    CommonModule,
    BreadcrumbModule,
    RouterLink,
    TranslatePipe,
    AppearanceControlsComponent,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
  host: {
    '[class.mobile-breadcrumb]': "variant() === 'mobile'",
  },
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private translate = inject(TranslateService);
  private sub!: Subscription;

  variant = input<'desktop' | 'mobile'>('desktop');
  breadcrumbs = signal<MenuItem[]>([]);

  homeItem: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/',
  };

  private routeLabels: Record<string, string> = {
    overview: 'DASHBOARD.BREADCRUMB.OVERVIEW',
    categories: 'DASHBOARD.BREADCRUMB.CATEGORIES',
    occasions: 'DASHBOARD.BREADCRUMB.OCCASIONS',
    products: 'DASHBOARD.BREADCRUMB.PRODUCTS',
    update: 'DASHBOARD.BREADCRUMB.EDIT',
    add: 'DASHBOARD.BREADCRUMB.ADD_NEW',
    edit: 'DASHBOARD.BREADCRUMB.EDIT',
    account: 'DASHBOARD.BREADCRUMB.ACCOUNT',
    'change-password': 'DASHBOARD.BREADCRUMB.CHANGE_PASSWORD',
  };

  ngOnInit(): void {
    this.buildBreadcrumbs();

    this.sub = merge(
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd)),
      this.translate.onLangChange
    ).subscribe(() => this.buildBreadcrumbs());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private buildBreadcrumbs(): void {
    const url = this.router.url.split('?')[0];
    const segments = url.split('/').filter(Boolean);

    const items: MenuItem[] = [];
    let cumulativePath = '';

    items.push({
      label: this.translate.instant('DASHBOARD.BREADCRUMB.DASHBOARD'),
      routerLink: '/dashboard/overview',
    });

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      cumulativePath += `/${segment}`;
      if (segments[i - 1] === 'update') {
        continue;
      }
      if (segment.toLowerCase() === 'dashboard') {
        continue;
      }

      const label = this.routeLabels[segment]
        ? this.translate.instant(this.routeLabels[segment])
        : this.toTitleCase(segment);
      const isLast = i === segments.length - 1;

      const routerLinkValue =
        segment.toLowerCase() === 'update'
          ? undefined
          : isLast
          ? undefined
          : cumulativePath;

      items.push({ label, routerLink: routerLinkValue });
    }

    this.breadcrumbs.set(items);
  }

  private toTitleCase(str: string): string {
    return str
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}
