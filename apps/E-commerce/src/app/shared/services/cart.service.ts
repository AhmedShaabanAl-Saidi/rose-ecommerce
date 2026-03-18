import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'apps/E-commerce/src/environments/environments';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);
  private readonly baseUrl = environment.baseUrl;

  addToCart(productId: string): Observable<unknown> {
    const obs$ = this.http.post(`${this.baseUrl}/cart`, {
      product: productId,
      quantity: 1,
    });

    obs$.subscribe({
      next: () => {
        this.toastr.success(
          this.translate.instant('WISHLIST.ADDED_TO_CART')
        );
      },
      error: () => {
        // error interceptor handles the toast
      },
    });

    return obs$;
  }
}
