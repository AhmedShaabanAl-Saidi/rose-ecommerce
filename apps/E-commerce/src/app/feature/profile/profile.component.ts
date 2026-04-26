import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRepo } from '@elevate/auth-domain';
import { CartService } from '../cart/services/cart.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly authRepo = inject(AuthRepo);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

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
}
