import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRepo } from '@elevate/auth-domain';
import { CartService } from '../cart/services/cart.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { take, tap } from 'rxjs';
import { AddressUiService } from '../../shared/components/ui/dialogs/address-dialog/services/address-ui.service';
import { ShippingAddressService } from '../shipping-address/services/shipping-address.service';
import { ShippingAddressResponse } from '../shipping-address/interfaces/shipping-address.interface';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    LucideAngularModule,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly authRepo = inject(AuthRepo);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly addressUiService = inject(AddressUiService);
  private readonly shippingAddressService = inject(ShippingAddressService);

  logout(): void {
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
  }

  openAddressManager(): void {
    this.shippingAddressService
      .getLoggedUserAddress()
      .pipe(take(1))
      .subscribe({
        next: (response: ShippingAddressResponse) => {
          const [firstAddress] = response.addresses ?? response.address ?? [];
          this.addressUiService.openAddressManager('view', firstAddress ?? undefined);
        },
        error: () => {
          this.addressUiService.openAddressManager('view', undefined);
        }
      });
  }
}
