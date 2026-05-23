import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';
import { LucideAngularModule } from 'lucide-angular';
import { Divider } from 'primeng/divider';
import { DecimalPipe } from '@angular/common';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslateModule } from '@ngx-translate/core';
import { AuthState } from '@elevate/auth-domain';
import { WishlistService } from '../../../../shared/services/wishlist.service';

@Component({
  selector: 'app-product-info',
  imports: [
    LucideAngularModule,
    Divider,
    DecimalPipe,
    ButtonComponent,
    TranslateModule,
  ],
  templateUrl: './product-info.component.html',
})
export class ProductInfoComponent {
  private readonly authState = inject(AuthState);
  private readonly wishlistService = inject(WishlistService);
  user = this.authState.currentUser;
  product = input.required<Product | null>();
  addToCart = output<string>();
  toggleWishlist = output<string>();
  isInWishlist = computed(() => {
    const productId = this.product()?._id;

    return !!productId && this.wishlistService.wishlistIds().includes(productId);
  });
}
