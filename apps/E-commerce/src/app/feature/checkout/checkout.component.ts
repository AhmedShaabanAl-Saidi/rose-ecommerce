import { Component, computed, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
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
import { ShippingAddressSectionComponent } from './components/shipping-address/shipping-address.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';
import { Address } from './interfaces/checkout.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    StepperComponent,
    ShippingAddressSectionComponent,
    CheckoutSummaryComponent,
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
  selectedAddress = signal<Address | null>(null);
  isLoading = signal<boolean>(false);

  cart = this._cartService.cart;

  btnLabel = computed(() => {
    return this.currentStep() === 1
      ? this._translateService.instant('CART.PROCEED_CHECKOUT') || 'Next'
      : this._translateService.instant('CART.PLACE_ORDER') || 'Place Order';
  });

  canProceed = computed(() => {
    if (this.currentStep() === 1) {
      return !!this.selectedAddress();
    }
    return true;
  });

  onAddressSelected(address: Address) {
    this.selectedAddress.set(address);
  }

  onNext() {
    if (this.currentStep() === 1) {
      this.currentStep.set(2);
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
}
