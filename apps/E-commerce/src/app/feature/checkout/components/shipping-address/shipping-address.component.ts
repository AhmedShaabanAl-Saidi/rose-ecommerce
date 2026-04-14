import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CheckoutService } from '../../services/checkout.service';
import { Address } from '../../interfaces/checkout.interface';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@elevate/reusable-ui';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-shipping-address-section',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    TranslateModule,
    ButtonComponent,
  ],
  templateUrl: './shipping-address.component.html',
})
export class ShippingAddressSectionComponent implements OnInit {
  private readonly _checkoutService = inject(CheckoutService);
  private readonly _destroyRef = inject(DestroyRef);

  addressSelected = output<Address>();
  addAddressClick = output<void>();

  addresses = signal<Address[]>([]);
  selectedAddressId = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.loadAddresses();
  }

  loadAddresses() {
    this.isLoading.set(true);
    this._checkoutService
      .getAddresses()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (res) => {
          this.addresses.set(res.addresses);
          if (res.addresses.length > 0) {
            this.selectAddress(res.addresses[0]);
          }
        },
      });
  }

  selectAddress(address: Address) {
    this.selectedAddressId.set(address._id);
    this.addressSelected.emit(address);
  }

  onAddAddress() {
    this.addAddressClick.emit();
  }
}
