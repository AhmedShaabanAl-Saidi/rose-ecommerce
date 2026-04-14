import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import {
  CheckoutSessionRes,
  OrderInput,
  OrderRes,
  ShippingAddressRes,
} from '../interfaces/checkout.interface';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _platformId = inject(PLATFORM_ID);

  getAddresses(): Observable<ShippingAddressRes> {
    return this._httpClient.get<ShippingAddressRes>(
      `${environment.baseUrl}/addresses`
    );
  }
}
