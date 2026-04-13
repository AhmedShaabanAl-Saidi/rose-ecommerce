import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ShippingAddressService } from './services/shipping-address.service';
import { ShippingAddress } from './interfaces/shipping-address.interface';
import { ButtonComponent } from '@elevate/reusable-ui';
import { LucideAngularModule } from 'lucide-angular';
import { Divider } from 'primeng/divider';
import { TranslateModule } from '@ngx-translate/core';
import { languageService } from '../../core/services/language-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shipping-address',
  imports: [ButtonComponent, LucideAngularModule, Divider, TranslateModule],
  templateUrl: './shipping-address.component.html',
})
export class ShippingAddressComponent implements OnInit {
  private readonly shippingAddressService = inject(ShippingAddressService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(languageService);
  shippingAddresses = signal<ShippingAddress[]>([]);
  selectedAddress = signal<ShippingAddress | null>(null);
  nextIcon = computed(() =>
    this.languageService.isRTL() ? 'move-left' : 'move-right'
  );
  ngOnInit(): void {
    this.getUserAddresses();
  }
  getUserAddresses() {
    this.shippingAddressService
      .getLoggedUserAddress()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          const addresses = data.addresses ?? data.address ?? [];
          this.shippingAddresses.set(addresses);
          if (addresses.length > 0 && !this.selectedAddress()) {
            this.selectedAddress.set(addresses[0]);
          }
        },
      });
  }
  selectAddress(address: ShippingAddress) {
    this.selectedAddress.set(address);
  }
  next() {
    // TODO: navigate to the next step in the checkout process, passing the selected address information
  }
  addAddress() {
    // TODO: open a modal to add a new address
  }
}
