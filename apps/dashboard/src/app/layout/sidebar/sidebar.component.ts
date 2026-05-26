import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Flower, LucideAngularModule } from 'lucide-angular';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { AppearanceControlsComponent } from '../appearance-controls/appearance-controls.component';
import {
  AuthRepo,
  eAuthStateService as AuthStateService,
} from '@elevate/auth-domain';
import { take, tap } from 'rxjs';

interface NavItem {
  labelKey: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    AvatarModule,
    MenuModule,
    LucideAngularModule,
    BreadcrumbComponent,
    AppearanceControlsComponent,
    TranslatePipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);
  private readonly authState = inject(AuthStateService);
  private readonly authRepo = inject(AuthRepo);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  user = this.authState.currentUser;
  readonly WebsiteIcon = Flower;

  navItems: NavItem[] = [
    {
      labelKey: 'DASHBOARD.BREADCRUMB.OVERVIEW',
      icon: 'pi pi-th-large',
      route: 'overview',
    },
    {
      labelKey: 'DASHBOARD.BREADCRUMB.CATEGORIES',
      icon: 'pi pi-clipboard',
      route: 'categories',
    },
    {
      labelKey: 'DASHBOARD.BREADCRUMB.OCCASIONS',
      icon: 'pi pi-calendar-plus',
      route: 'occasions',
    },
    {
      labelKey: 'DASHBOARD.BREADCRUMB.PRODUCTS',
      icon: 'pi pi-box',
      route: 'products',
    },
  ];

  profileMenuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.buildProfileMenuItems();

    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.buildProfileMenuItems());
  }

  private buildProfileMenuItems(): void {
    this.profileMenuItems = [
      {
        label: this.translate.instant('DASHBOARD.NAVIGATION.ACCOUNT'),
        icon: 'pi pi-user',
        command: () => this.router.navigate(['dashboard', 'account']),
      },
      {
        separator: true,
      },
      {
        label: this.translate.instant('DASHBOARD.NAVIGATION.LOG_OUT'),
        icon: 'pi pi-sign-out',
        command: () => {
          this.authRepo
            .logout()
            .pipe(
              tap(() => {
                this.router.navigate(['/auth/login']);
              }),
              take(1)
            )
            .subscribe();
        },
      },
    ];
  }
}
