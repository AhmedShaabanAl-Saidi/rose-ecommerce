import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "apps/E-commerce/src/environments/environments";

@Injectable({
  providedIn: 'root',
})

export class CouponService {
   private baseUrl = environment.baseUrl;
  private _http = inject(HttpClient);


  validateCoupon(code: string) {
  const token = localStorage.getItem('token');
  return this._http.post(
    `${this.baseUrl}/coupons/validate`,
    { code },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

applyCoupon(code: string) {
  return this._http.post(`${this.baseUrl}/coupons/apply`, { code });
}

}


