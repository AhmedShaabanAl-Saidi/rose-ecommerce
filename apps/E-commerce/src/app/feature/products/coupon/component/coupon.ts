import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CouponService } from "../services/coupon";

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './coupon.html'
})
export class CouponComponent {


  couponCode: string = '';
  isCouponValid: boolean = false;
  couponError: string = '';
  discountAmount: number = 125;
  subtotal: number = 250;
  isApplying: boolean = false;

  private couponService = inject(CouponService);

  applyCoupon(): void {
    if (!this.couponCode) return;

    this.isApplying = true;

    this.couponService.validateCoupon(this.couponCode).subscribe({
      next: (res: any) => {
        this.isCouponValid = true;
        this.couponError = '';
        this.discountAmount = res.discountValue || 0;

        this.isApplying = false;
      },
      error: () => {
        this.isCouponValid = false;
        this.couponError = 'Invalid coupon';
        this.discountAmount = 0;

        this.isApplying = false;
      }
    });
  }
}
