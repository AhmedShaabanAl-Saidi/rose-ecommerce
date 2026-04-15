import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import {
  CheckoutSessionRes,
  OrderInput,
  OrderRes,
} from '../interfaces/checkout.interface';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _platformId = inject(PLATFORM_ID);

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
