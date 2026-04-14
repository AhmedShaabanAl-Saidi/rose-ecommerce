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

  placeCashOrder(cartId: string, orderData: OrderInput): Observable<OrderRes> {
    return this._httpClient.post<OrderRes>(
      `${environment.baseUrl}/orders/${cartId}`,
      orderData
    );
  }

  placeOnlineOrder(
    cartId: string,
    orderData: OrderInput
  ): Observable<CheckoutSessionRes> {
    const origin = isPlatformBrowser(this._platformId)
      ? window.location.origin
      : environment.baseUrl;

    return this._httpClient.post<CheckoutSessionRes>(
      `${environment.baseUrl}/orders/checkout-session/${cartId}?url=${origin}`,
      orderData
    );
  }
}
