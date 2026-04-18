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

  private getOrdersReturnUrl(): string {
    const appOrigin = isPlatformBrowser(this._platformId)
      ? window.location.origin
      : new URL(environment.baseUrl).origin;

    return new URL('/allorders', appOrigin).toString();
  }

  placeCashOrder(orderData: OrderInput): Observable<OrderRes> {
    return this._httpClient.post<OrderRes>(
      `${environment.baseUrl}/orders`,
      orderData
    );
  }

  placeOnlineOrder(orderData: OrderInput): Observable<CheckoutSessionRes> {
    const returnUrl = this.getOrdersReturnUrl();

    return this._httpClient.post<CheckoutSessionRes>(
      `${environment.baseUrl}/orders/checkout?url=${encodeURIComponent(
        returnUrl
      )}`,
      orderData
    );
  }
}