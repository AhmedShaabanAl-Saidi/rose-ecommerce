import { ToastrService } from 'ngx-toastr';
import { Component,computed,effect,ElementRef,inject,signal,ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthRepo, AuthState } from '@elevate/auth-domain';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { languageService } from '../../../../../services/language-service';
import { LanguageSwitcherComponent } from '../../../../auth-layout/components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '../../../../auth-layout/components/theme-switcher/theme-switcher.component';
import { CartService } from '../../../../../../../app/feature/cart/services/cart.service';
import {catchError,debounceTime,distinctUntilChanged,finalize,map,of,switchMap,take,tap} from 'rxjs';
import { WishlistService } from '../../../../../../shared/services/wishlist.service';
import { ShippingAddress } from '../../../../../../../app/feature/shipping-address/interfaces/shipping-address.interface';
import { ShippingAddressService } from '../../../../../../../app/feature/shipping-address/services/shipping-address.service';
import { AddressUiService } from '../../../../../../shared/components/ui/dialogs/address-dialog/services/address-ui.service';
import { ProductsService } from '../../../../../../../app/feature/products/services/product';
import { Product } from '../../../../../../shared/components/ui/product-card/interface/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-top-navbar',
  imports: [
    DecimalPipe,
    LucideAngularModule,
    ReactiveFormsModule,
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
  @ViewChild('searchPanelInput')
  private searchPanelInput?: ElementRef<HTMLInputElement>;

  private readonly MIN_SEARCH_LENGTH = 2;
  private readonly authState = inject(AuthState);
  private readonly authRepo = inject(AuthRepo);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(languageService);
  private readonly cartService = inject(CartService);
  private readonly shippingAddressService = inject(ShippingAddressService);
  private readonly addressUiService = inject(AddressUiService);
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);
  readonly cartCount = computed(() => this.cartService.cartCount());
  readonly wishlistService = inject(WishlistService);
  readonly user = this.authState.currentUser;
  readonly primaryAddress = signal<ShippingAddress | null>(null);
  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly searchValue = signal('');
  readonly searchResults = signal<Product[]>([]);
  readonly suggestedProducts = signal<Product[]>([]);
  readonly isSearchPanelOpen = signal(false);
  readonly isSearchLoading = signal(false);
  readonly isSuggestedProductsLoading = signal(false);
  readonly hasSearchTerm = computed(
    () => this.searchValue().length >= this.MIN_SEARCH_LENGTH
  );
  readonly panelProducts = computed(() =>
    this.hasSearchTerm() ? this.searchResults() : this.suggestedProducts()
  );
  readonly isPanelLoading = computed(() =>
    this.hasSearchTerm()
      ? this.isSearchLoading()
      : this.isSuggestedProductsLoading()
  );
  readonly showNoSearchResults = computed(
    () =>
      this.hasSearchTerm() &&
      !this.isSearchLoading() &&
      this.searchResults().length === 0
  );
  readonly showNoSuggestedProducts = computed(
    () =>
      !this.hasSearchTerm() &&
      !this.isSuggestedProductsLoading() &&
      this.suggestedProducts().length === 0
  );
  readonly deliveryAddressText = computed(() => {
    this.language.currentLang();

    const address = this.primaryAddress();
    const city = address?.city?.trim();

    if (!city) {
      return this.translate.instant('NAVBAR.ADD_ADDRESS');
    }

    return city;
  });

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        map((value) => value.trim()),
        tap((value) => {
          this.searchValue.set(value);

          if (value.length < this.MIN_SEARCH_LENGTH) {
            this.searchResults.set([]);
            this.isSearchLoading.set(false);
          }
        }),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((keyword) => {
          if (keyword.length < this.MIN_SEARCH_LENGTH) {
            return of<Product[]>([]);
          }

          this.isSearchLoading.set(true);

          return this.productsService.getProducts({ keyword, limit: 20 }).pipe(
            map((response) => response.products),
            catchError(() => of<Product[]>([])),
            finalize(() => this.isSearchLoading.set(false))
          );
        }),
        takeUntilDestroyed()
      )
      .subscribe((products) => {
        this.searchResults.set(products);
      });

    effect(() => {
      const user = this.user();

      if (!user) {
        this.primaryAddress.set(null);
        return;
      }

      this.loadPrimaryAddress();
      this.wishlistService.loadWishlist().pipe(take(1)).subscribe();
    });
  }

  readonly items = computed<MenuItem[]>(() => {
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
            routerLink: '/allOrders',
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
                  tap(() => {
                    this.cartService.setDefaultCart();
                    this.wishlistService.clearWishlist();
                  }),
                  take(1)
                )
                .subscribe();
            },
          },
        ],
      },
    ];
  });
  private readonly toastrService = inject(ToastrService);

  private loadPrimaryAddress() {
    this.shippingAddressService
      .getLoggedUserAddress()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          const [firstAddress] = response.addresses ?? response.address ?? [];
          this.primaryAddress.set(firstAddress ?? null);
        },
      });
  }

  openAddressManager() {
    this.addressUiService
      .openAddressManager('view', this.primaryAddress() ?? undefined)
      ?.onClose.pipe(take(1))
      .subscribe(() => {
        if (this.user()) {
          this.loadPrimaryAddress();
        }
      });
  }

  navigateToCart(event: Event) {
    if (!this.user()) {
      event.preventDefault();
      this.toastrService.error(
        this.translate.instant('NAVBAR.CART.LOGIN_TO_ACCESS')
      );
    }
  }

  navigateToWishlist(event: Event) {
    if (!this.user()) {
      event.preventDefault();
      this.toastrService.error(
        this.translate.instant('NAVBAR.WISHLIST.LOGIN_TO_ACCESS')
      );
    }
  }

  openSearchPanel(): void {
    this.isSearchPanelOpen.set(true);
    this.loadSuggestedProducts();
    this.focusSearchInput();
  }

  closeSearchPanel(): void {
    this.isSearchPanelOpen.set(false);
  }

  clearSearch(event?: Event): void {
    event?.stopPropagation();
    this.resetSearch();
    this.focusSearchInput();
  }

  clearAndCloseSearch(): void {
    this.resetSearch(false);
    this.closeSearchPanel();
  }

  selectProduct(product: Product): void {
    this.clearAndCloseSearch();
    this.router.navigate(['/products', product._id]);
  }

  getProductPrice(product: Product): number {
    return product.priceAfterDiscount ?? product.price;
  }

  highlightTitle(title: string): string {
    const keyword = this.searchValue();

    if (!keyword) {
      return this.escapeHtml(title);
    }

    const matchIndex = title.toLowerCase().indexOf(keyword.toLowerCase());

    if (matchIndex === -1) {
      return this.escapeHtml(title);
    }

    const beforeMatch = title.slice(0, matchIndex);
    const match = title.slice(matchIndex, matchIndex + keyword.length);
    const afterMatch = title.slice(matchIndex + keyword.length);

    return `${this.escapeHtml(
      beforeMatch
    )}<mark class="bg-transparent font-bold text-maroon-600 dark:text-soft-pink-300">${this.escapeHtml(
      match
    )}</mark>${this.escapeHtml(afterMatch)}`;
  }

  private focusSearchInput(): void {
    setTimeout(() => this.searchPanelInput?.nativeElement.focus());
  }

  private resetSearch(emitEvent = true): void {
    this.searchControl.setValue('', { emitEvent });
    this.searchValue.set('');
    this.searchResults.set([]);
    this.isSearchLoading.set(false);
  }

  private loadSuggestedProducts(): void {
    if (this.suggestedProducts().length || this.isSuggestedProductsLoading()) {
      return;
    }

    this.isSuggestedProductsLoading.set(true);

    this.productsService
      .getProducts({ limit: 20 })
      .pipe(
        take(1),
        map((response) => response.products),
        catchError(() => of<Product[]>([])),
        finalize(() => this.isSuggestedProductsLoading.set(false))
      )
      .subscribe((products) => {
        this.suggestedProducts.set(products);
      });
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (char) => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };

      return entities[char];
    });
  }
}
