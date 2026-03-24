import { Component, inject, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CouponService } from "../services/coupon";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "@elevate/reusable-ui";
import { CartService } from "../../../cart/services/cart.service";

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [FormsModule, TranslateModule, ButtonComponent],
  templateUrl: './coupon.html'
})
export class CouponComponent {
  private readonly couponService = inject(CouponService);
  private readonly cartService = inject(CartService);


  couponCode = signal('');
  isApplying = signal(false);
  couponError = signal('');

  cart = computed(() => this.cartService.cart());

  subtotal = computed(() => this.cart()?.totalPrice ??0);
  discount = computed(() => this.cart()?.discount ?? 0);
  total = computed(() => this.cart()?.totalPriceAfterDiscount ?? this.subtotal());

  appliedCoupons = computed(() => this.cart()?.appliedCoupons ?? []);

  applyCoupon(): void {
    const code = this.couponCode().trim();
    if (!code) return;

    this.isApplying.set(true);
    this.couponError.set('');

    this.couponService.applyCoupon(code).subscribe({
      next: () => {
        this.isApplying.set(false);
        this.couponCode.set('');
      },
      error: (err) => {
        this.isApplying.set(false);
        this.couponError.set(err.error?.message || 'Invalid Coupon');
      }
    });
  }
}
