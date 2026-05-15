import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import {
  AuthRepo,
  eAuthStateService as AuthStateService,
} from '@elevate/auth-domain';
import { take, tap } from 'rxjs';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    AvatarModule,
    MenuModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  private router = inject(Router);
  private readonly authState = inject(AuthStateService);
  private readonly authRepo = inject(AuthRepo);
  user = this.authState.currentUser;

  navItems: NavItem[] = [
    { label: 'Overview', icon: 'pi pi-th-large', route: 'overview' },
    { label: 'Categories', icon: 'pi pi-tag', route: 'categories' },
    { label: 'Occasions', icon: 'pi pi-calendar', route: 'occasions' },
    { label: 'Products', icon: 'pi pi-box', route: 'products' },
  ];

  profileMenuItems: MenuItem[] = [
    {
      label: 'Account',
      icon: 'pi pi-user',
      command: () => this.router.navigate(['/account']),
    },
    {
      separator: true,
    },
    {
      label: 'Log out',
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
