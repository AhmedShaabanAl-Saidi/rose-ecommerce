import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable } from "@angular/core";
import { environment } from "apps/E-commerce/src/environments/environments";
import { Observable, tap } from "rxjs";
import { CartService } from "../../../cart/services/cart.service";
import {  ICartResponse } from "../../../cart/interfaces/cart.interface";

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private readonly baseUrl = environment.baseUrl;
  private readonly _http = inject(HttpClient);
  private readonly _cartService = inject(CartService);



  applyCoupon(code: string): Observable<ICartResponse> {
    return this._http.post<ICartResponse>(`${this.baseUrl}/cart/applyCoupon`, { code })
      .pipe(
        tap(() => {
          this._cartService.getLoggedUserCart().subscribe();
        })
      );
  }
}
