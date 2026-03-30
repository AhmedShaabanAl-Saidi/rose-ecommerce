import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-copoun',
  imports: [
    ButtonComponent,
    DecimalPipe,
    TranslatePipe,
    ReactiveFormsModule,
    TextInputComponent,
  ],
  templateUrl: './copoun.component.html',
})
export class CopounComponent {
  private readonly cartService = inject(CartService);
  private readonly destroyRef = inject(DestroyRef);

  readonly isApplyingCoupon = signal(false);
  readonly cart = computed(() => this.cartService.cart());
  readonly hasItems = computed(() => (this.cart()?.cartItems?.length ?? 0) > 0);

  readonly couponForm = new FormGroup({
    code: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  readonly subtotal = computed(() => this.cart()?.totalPrice ?? 0);
  readonly total = computed(
    () => this.cart()?.totalPriceAfterDiscount ?? this.subtotal()
  );

  readonly totalDiscountAmount = computed(() => {
    const diff = this.subtotal() - this.total();
    return diff > 0 ? diff : 0;
  });

  readonly discountPercent = computed(() => {
    if (this.subtotal() === 0) return 0;
    return Math.round((this.totalDiscountAmount() / this.subtotal()) * 100);
  });

  applyCoupon(): void {
    if (this.isApplyingCoupon() || !this.hasItems()) {
      return;
    }

    const code = this.couponForm.controls.code.value.trim();
    this.couponForm.controls.code.setValue(code);

    if (!code) {
      this.couponForm.controls.code.markAsTouched();
      return;
    }

    this.isApplyingCoupon.set(true);

    this.cartService
      .applyCoupon(code)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isApplyingCoupon.set(false))
      )
      .subscribe({
        next: () => {
          this.couponForm.reset({ code: '' });
        },
      });
  }
}
