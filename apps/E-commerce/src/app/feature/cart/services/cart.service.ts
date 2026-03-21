import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable, tap } from 'rxjs';
import { Cart, ICartResponse, IClearCart } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _httpClient = inject(HttpClient);
  private _toastrService = inject(ToastrService);
  private _translateService = inject(TranslateService);
  private _cart = signal<Cart | null>(null);
  private _cartCount = signal<number>(0);

  readonly cart = computed(() => this._cart());
  readonly cartCount = computed(() => this._cartCount());

  private updateState(res: ICartResponse) {
    this._cart.set(res.cart);
    this._cartCount.set(res.numOfCartItems);
  }

  addToCart(productId: string, quantity = 1): Observable<ICartResponse> {
    return this._httpClient
      .post<ICartResponse>(`${environment.baseUrl}/cart`, {
        product: productId,
        quantity,
      })
      .pipe(
        tap((res) => {
          this.updateState(res);
          this._toastrService.success(
            this._translateService.instant('CART.ADD_SUCCESS')
          );
        })
      );
  }

  updateToCart(productId: string, quantity: number): Observable<ICartResponse> {
    return this._httpClient
      .put<ICartResponse>(`${environment.baseUrl}/cart/${productId}`, {
        quantity,
      })
      .pipe(
        tap((res) => {
          this.updateState(res);
          this._toastrService.success(
            this._translateService.instant('CART.UPDATE_SUCCESS')
          );
        })
      );
  }

  getLoggedUserCart(): Observable<ICartResponse> {
    return this._httpClient
      .get<ICartResponse>(`${environment.baseUrl}/cart`)
      .pipe(
        tap((res) => {
          this.updateState(res);
        })
      );
  }

  removeCartItem(productId: string): Observable<ICartResponse> {
    return this._httpClient
      .delete<ICartResponse>(`${environment.baseUrl}/cart/${productId}`)
      .pipe(
        tap((res) => {
          this.updateState(res);
          this._toastrService.success(
            this._translateService.instant('CART.REMOVE_SUCCESS')
          );
        })
      );
  }

  clearUserCart(): Observable<IClearCart> {
    return this._httpClient
      .delete<IClearCart>(`${environment.baseUrl}/cart`)
      .pipe(
        tap(() => {
          this.setDefaultCart();
          this._toastrService.success(
            this._translateService.instant('CART.CLEAR_SUCCESS')
          );
        })
      );
  }
  setDefaultCart() {
    this._cart.set(null);
    this._cartCount.set(0);
  }
}
