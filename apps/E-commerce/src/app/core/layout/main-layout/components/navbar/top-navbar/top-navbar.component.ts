import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthRepo, AuthState } from '@elevate/auth-domain';
import { TextInputComponent } from '@elevate/reusable-input';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { languageService } from '../../../../../services/language-service';
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
  private readonly authRepo = inject(AuthRepo);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(languageService);

  user = this.authState.currentUser;

  items = computed<MenuItem[]>(() => {
    this.language.currentLang();

    const user = this.user();
    if (!user) return [];

    return [
      {
        label: user.firstName,
        items: [
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.PROFILE'),
            icon: 'pi pi-user',
            routerLink: '/',
          },
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.ADDRESSES'),
            icon: 'pi pi-map-marker',
            routerLink: '/',
          },
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.ORDERS'),
            icon: 'pi pi-shopping-cart',
            routerLink: '/',
          },
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.DASHBOARD'),
            icon: 'pi pi-chart-bar',
            routerLink: '/',
          },
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.LOGOUT'),
            icon: 'pi pi-sign-out',
            command: () => this.authRepo.logout().subscribe(),
          },
        ],
      },
    ];
  });
}
