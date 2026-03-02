import { DecimalPipe, NgClass } from '@angular/common';
import { Component, computed, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@elevate/reusable-ui';
import { LucideAngularModule } from 'lucide-angular';
import { Product } from './interface/product';
import { ProductsService } from '../../../../feature/home/pages/product/services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [LucideAngularModule, DecimalPipe, ButtonComponent, NgClass],
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

  localIsInWishlist: boolean = false;

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
  private readonly productService = inject(ProductsService);

  ngOnInit(): void {
    this.localIsInWishlist = this.product().isInWishlist;
  }

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
    this.productService.addToWishlist(this.product()._id).subscribe({
      next: () => {
        this.localIsInWishlist = !this.localIsInWishlist;
      },
      error: (err) => {
        console.error('Failed to update wishlist:', err);
      }
    });
  }

  showProductDetails(): void {
    this.router.navigate(['products-details', this.product()._id]);
  }
}
