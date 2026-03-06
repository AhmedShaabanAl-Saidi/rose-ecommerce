import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Product } from './interface/product';

@Component({
  selector: 'app-product-card',
  imports: [LucideAngularModule, DecimalPipe, ButtonComponent, TranslatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();

  readonly ICON_SIZE = 18;
  readonly ICON_STROKE = 2;
  readonly EYE_ICON_SIZE = 22;
  readonly CART_ICON_SIZE = 20;

  readonly ADD_WISH = 'ADD_WISH';
  readonly REMOVE_WISH = 'REMOVE_WISH';

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

  private readonly router = inject(Router);

  getStarClip(starIndex: number): string {
    const rating = this.product().rateAvg ?? 0;
    if (starIndex <= Math.floor(rating)) return 'inset(0 0 0 0)';
    if (starIndex === Math.ceil(rating)) {
      const partial = (rating % 1) * 100;
      return `inset(0 ${100 - partial}% 0 0)`;
    }
    return 'inset(0 100% 0 0)';
  }

  addToCart(): void {
    // Implement add to cart functionality here
  }

  addToWishList(): void {
    // Implement add to WishlIst functionality here
  }

  showProductDetails(): void {
    this.router.navigate(['products-details', this.product()._id]);
  }
}
