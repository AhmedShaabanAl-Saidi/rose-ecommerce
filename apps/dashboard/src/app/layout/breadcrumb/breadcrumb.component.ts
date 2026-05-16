import { CommonModule } from '@angular/common';
import {Component,OnDestroy,OnInit,inject,input,signal} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, BreadcrumbModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private sub!: Subscription;

  variant = input<'desktop' | 'mobile'>('desktop');
  breadcrumbs = signal<MenuItem[]>([]);

  homeItem: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/',
  };

  private routeLabels: Record<string, string> = {
    overview: 'Overview',
    categories: 'Categories',
    occasions: 'Occasions',
    products: 'Products',
    add: 'Add New',
    edit: 'Edit',
  };

  ngOnInit(): void {
    this.buildBreadcrumbs();

    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.buildBreadcrumbs());
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
      label: 'Dashboard',
      routerLink: '/dashboard/overview',
    });

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      cumulativePath += `/${segment}`;

      if (segment.toLowerCase() === 'dashboard') {
        continue;
      }

      const label = this.routeLabels[segment] ?? this.toTitleCase(segment);
      const isLast = i === segments.length - 1;

      items.push({
        label,
        routerLink: isLast ? undefined : cumulativePath,
      });
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
