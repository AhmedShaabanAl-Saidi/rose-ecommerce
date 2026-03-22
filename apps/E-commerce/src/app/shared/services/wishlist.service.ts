import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'apps/E-commerce/src/environments/environments';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../components/ui/product-card/interface/product';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface WishlistResponse {
  count: number;
  data: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);
  private readonly baseUrl = environment.baseUrl;

  private readonly _wishlistIds = signal<Set<string>>(new Set());
  private readonly _wishlistProducts = signal<Product[]>([]);
  private readonly _isLoading = signal<boolean>(false);

  readonly wishlistIds = this._wishlistIds.asReadonly();
  readonly wishlistProducts = this._wishlistProducts.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly wishlistCount = computed(() => this._wishlistIds().size);

  isInWishlist(productId: string): boolean {
    return this._wishlistIds().has(productId);
  }

  loadWishlist(): Observable<unknown> {
    this._isLoading.set(true);
    return this.http.get<unknown>(`${this.baseUrl}/wishlist`).pipe(
      tap({
        next: (res) => {
          let productsArray: Product[] = [];
          
          if (Array.isArray(res)) {
            productsArray = res as Product[];
          } else if (res && typeof res === 'object') {
            const record = res as Record<string, unknown>;
            if (Array.isArray(record['data'])) {
              productsArray = record['data'] as Product[];
            } else if (Array.isArray(record['wishlist'])) {
              productsArray = record['wishlist'] as Product[];
            } else if (record['wishlist'] && typeof record['wishlist'] === 'object') {
              const wishlistObj = record['wishlist'] as Record<string, unknown>;
              if (Array.isArray(wishlistObj['products'])) {
                productsArray = wishlistObj['products'] as Product[];
              }
            } else if (record['data'] && typeof record['data'] === 'object') {
               const dataObj = record['data'] as Record<string, unknown>;
               if (Array.isArray(dataObj['products'])) {
                 productsArray = dataObj['products'] as Product[];
               }
            }
          }

          const ids = new Set(productsArray.map((p) => p._id || p.id));
          this._wishlistIds.set(ids);
          this._wishlistProducts.set(productsArray);
          this._isLoading.set(false);
        },
        error: () => {
          this._isLoading.set(false);
        },
      })
    );
  }

  toggleWishlist(productId: string): Observable<unknown> {
    if (this.isInWishlist(productId)) {
      return this.removeFromWishlist(productId);
    } else {
      return this.addToWishlist(productId);
    }
  }

  addToWishlist(productId: string): Observable<unknown> {
    // Optimistic update
    this._wishlistIds.update((ids) => {
      const updated = new Set(ids);
      updated.add(productId);
      return updated;
    });

    return this.http
      .post<unknown>(`${this.baseUrl}/wishlist`, { productId })
      .pipe(
        tap({
          next: () => {
            this.toastr.success(
              this.translate.instant('WISHLIST.ADDED')
            );
            this.loadWishlist().subscribe();
          },
          error: () => {
            // Rollback
            this._wishlistIds.update((ids) => {
              const updated = new Set(ids);
              updated.delete(productId);
              return updated;
            });
          },
        })
      );
  }

  removeFromWishlist(productId: string): Observable<unknown> {
    // Optimistic update
    this._wishlistIds.update((ids) => {
      const updated = new Set(ids);
      updated.delete(productId);
      return updated;
    });
    this._wishlistProducts.update((products) =>
      products.filter((p) => p._id !== productId)
    );

    return this.http
      .delete<unknown>(`${this.baseUrl}/wishlist/${productId}`)
      .pipe(
        tap({
          next: () => {
            this.toastr.success(
              this.translate.instant('WISHLIST.REMOVED')
            );
          },
          error: () => {
            // Rollback
            this._wishlistIds.update((ids) => {
              const updated = new Set(ids);
              updated.add(productId);
              return updated;
            });
            this.loadWishlist().subscribe();
          },
        })
      );
  }
}
