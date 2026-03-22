import { ToastrService } from 'ngx-toastr';
import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { CartService } from '../../../../../../../app/feature/cart/services/cart.service';
import { take, tap } from 'rxjs';
import { WishlistService } from '../../../../../../shared/services/wishlist.service';
@Component({
  selector: 'app-top-navbar',
  imports: [
    TextInputComponent,
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    DividerModule,
    LanguageSwitcherComponent,
    TranslatePipe,
    MenuModule,
    ThemeSwitcherComponent,
  ],
  templateUrl: './top-navbar.component.html',
})
export class TopNavbarComponent {
  private readonly authState = inject(AuthState);
  private readonly authRepo = inject(AuthRepo);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(languageService);
  private readonly cartService = inject(CartService);
  cartCount = computed(() => this.cartService.cartCount());
  readonly wishlistService = inject(WishlistService);
  user = this.authState.currentUser;

  constructor() {
    effect(() => {
      if (this.user()) {
        this.wishlistService.loadWishlist().pipe(take(1)).subscribe();
      }
    });
  }

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
            routerLink: '/shopping-cart',
          },
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.DASHBOARD'),
            icon: 'pi pi-chart-bar',
            routerLink: '/',
          },
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.LOGOUT'),
            icon: 'pi pi-sign-out',
            command: () => {
              this.authRepo
                .logout()
                .pipe(
                  tap(() => this.cartService.setDefaultCart()),
                  take(1)
                )
                .subscribe();
            },
          },
        ],
      },
    ];
  });
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  navigateToCart(event: Event) {
    if (!this.user()) {
      event.preventDefault();
      this.toastrService.error('Please Login...');
    }
  }
}
