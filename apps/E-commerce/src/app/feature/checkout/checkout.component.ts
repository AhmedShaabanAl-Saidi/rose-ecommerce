import {
  Component,
  computed,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { finalize } from 'rxjs';

import { StepperComponent, StepperStep } from '@elevate/reusable-ui';

import { CheckoutService } from './services/checkout.service';
import { CartService } from '../cart/services/cart.service';
import {
  PaymentMethodSectionComponent,
  PaymentMethod,
} from './components/payment-method/payment-method.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';
import { ProductLikedComponent } from '../cart/components/product-liked/product-liked.component';
import { OrderInput } from './interfaces/checkout.interface';
import { ShippingAddressComponent } from '../shipping-address/shipping-address.component';
import { ShippingAddress } from '../shipping-address/interfaces/shipping-address.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    StepperComponent,
    PaymentMethodSectionComponent,
    CheckoutSummaryComponent,
    ProductLikedComponent,
    ShippingAddressComponent,
  ],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private readonly _router = inject(Router);
  private readonly _checkoutService = inject(CheckoutService);
  private readonly _cartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _translateService = inject(TranslateService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _platformId = inject(PLATFORM_ID);

  readonly checkoutSteps: StepperStep[] = [
    { label: 'Shipping' },
    { label: 'Payment' },
  ];

  currentStep = signal<number>(1);
  selectedAddress = signal<ShippingAddress | null>(null);
  selectedPaymentMethod = signal<PaymentMethod>('card');
  isLoading = signal<boolean>(false);

  cart = this._cartService.cart;


  onAddressSelected(address: ShippingAddress) {
    this.selectedAddress.set(address);
  }

  onAddressProceed(address: ShippingAddress) {
    this.selectedAddress.set(address);
    this.currentStep.set(2);
  }

  onPaymentMethodSelected(method: PaymentMethod) {
    this.selectedPaymentMethod.set(method);
  }

  onNext() {
    if (this.currentStep() === 1) {
      this.currentStep.set(2);
    } else {
      this.placeOrder();
    }
  }

  onBack() {
    if (this.currentStep() > 1) {
      this.currentStep.set(1);
    } else {
      this._router.navigate(['/shopping-cart']);
    }
  }

  onAddAddress() {
    this._toastrService.info(
      this._translateService.instant('CHECKOUT.ADD_ADDRESS_MODAL') ||
        'Add New Address modal coming soon.'
    );
  }

  placeOrder() {
    const cartId = this.cart()?._id;
    const address = this.selectedAddress();

    console.log('CheckoutComponent.placeOrder:', {
      cartId,
      address,
      method: this.selectedPaymentMethod(),
    });

    if (!cartId || !address) {
      console.warn('CheckoutComponent: Missing cartId or address');
      return;
    }

    const orderData: OrderInput = {
      shippingAddress: {
        street: address.street,
        phone: address.phone,
        city: address.city,
        lat: address.lat || '0',
        long: address.long || '0',
      },
    };

    this.isLoading.set(true);

    if (this.selectedPaymentMethod() === 'cash') {
      this._checkoutService
        .placeCashOrder(orderData)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.isLoading.set(false))
        )
        .subscribe({
          next: () => {
            this._toastrService.success(
              this._translateService.instant('CHECKOUT.ORDER_SUCCESS') ||
                'Order placed successfully!'
            );
            this._cartService.setDefaultCart();
            this._cartService
              .getLoggedUserCart()
              .pipe(takeUntilDestroyed(this._destroyRef))
              .subscribe();
            this._router.navigate(['/allOrders']);
          },
          error: (err) => {
            this._toastrService.error(
              err.error?.message ||
                this._translateService.instant('CHECKOUT.ORDER_FAILED') ||
                'Payment failed, please try again or choose another method'
            );
          },
        });
    } else {
      this._checkoutService
        .placeOnlineOrder(orderData)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.isLoading.set(false))
        )
        .subscribe({
          next: (res) => {
            if (isPlatformBrowser(this._platformId) && res.session.url) {
              window.location.href = res.session.url;
            }
          },
          error: (err) => {
            this._toastrService.error(
              err.error?.message ||
                this._translateService.instant('CHECKOUT.ORDER_FAILED') ||
                'Payment failed, please try again or choose another method'
            );
          },
        });
    }
  }
}
