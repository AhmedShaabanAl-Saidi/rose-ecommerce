import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthRepo, AuthState } from '@elevate/auth-domain';
import { TextInputComponent } from '@elevate/reusable-input';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { LanguageSwitcherComponent } from '../../../../auth-layout/components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '../../../../auth-layout/components/theme-switcher/theme-switcher.component';
@Component({
  selector: 'app-top-navbar',
  imports: [
    TextInputComponent,
    LucideAngularModule,
    RouterLink,
    DividerModule,
    LanguageSwitcherComponent,
    TranslatePipe,
    MenuModule,
    ThemeSwitcherComponent,
  ],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css',
})
export class TopNavbarComponent {
  private readonly authState = inject(AuthState);
  user = this.authState.currentUser;
  private readonly authRepo = inject(AuthRepo);

  items = computed<MenuItem[]>(() => {
    const user = this.user();
    if (!user) return [];
    return [
      {
        label: user.firstName,
        items: [
          { label: 'My Profile', icon: 'pi pi-user', routerLink: '/' },
          { label: 'My Addresses', icon: 'pi pi-map-marker', routerLink: '/' },
          { label: 'My Orders', icon: 'pi pi-shopping-cart', routerLink: '/' },
          { label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: '/' },
          {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: () => this.authRepo.logout().subscribe(),
          },
        ],
      },
    ];
  });
}
