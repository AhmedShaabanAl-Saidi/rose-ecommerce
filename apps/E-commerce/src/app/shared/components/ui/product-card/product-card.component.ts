import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ButtonComponent } from '@elevate/reusable-ui';
import { LucideAngularModule } from 'lucide-angular';
import { Product } from './interface/product';

@Component({
  selector: 'app-product-card',
  imports: [LucideAngularModule, DecimalPipe, ButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();

  readonly ICON_SIZE = 18;
  readonly ICON_STROKE = 2;
  readonly EYE_ICON_SIZE = 22;
  readonly CART_ICON_SIZE = 20;

  readonly ADD_WISH = 'Add to wishlist';
  readonly REMOVE_WISH = 'Remove from wishlist';

  readonly BADGE_BASE =
    'text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-md';

  isInWishlist = computed(() => this.product().isInWishlist);

  hotProduct = computed(
    () => !!(this.product().sold && this.product().sold >= 500)
  );

  //90 days for add new Badge
  newProduct = computed(() => {
    if (!this.product().createdAt) return false;
    const ninetyDaysInMs = 90 * 24 * 60 * 60 * 1000;
    return (
      new Date(this.product().createdAt) > new Date(Date.now() - ninetyDaysInMs)
    );
  });

  getStarClip(starIndex: number): string {
    const rating = this.product().rateAvg;
    if (starIndex <= Math.floor(rating)) return 'inset(0 0 0 0)';
    if (starIndex === Math.ceil(rating)) {
      const partial = (rating % 1) * 100;
      return `inset(0 ${100 - partial}% 0 0)`;
    }
    return 'inset(0 100% 0 0)';
  }
  addToCart(): void {
    // add To Cart
  }
  addToWishList(): void {
    // add to wishlist
  }
  showProductDetails(): void {
    // show product
  }
}
