import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'apps/E-commerce/src/environments/environments';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../components/ui/product-card/interface/product';

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

  loadWishlist(): void {
    this._isLoading.set(true);
    this.http.get<any>(`${this.baseUrl}/wishlist`).subscribe({
      next: (res) => {
        let productsArray: any[] = [];
        if (Array.isArray(res)) {
          productsArray = res;
        } else if (res && Array.isArray(res.data)) {
          productsArray = res.data;
        } else if (res && Array.isArray(res.wishlist)) {
          productsArray = res.wishlist;
        } else if (res && res.wishlist && Array.isArray(res.wishlist.products)) {
          productsArray = res.wishlist.products;
        } else if (res && res.data && Array.isArray(res.data.products)) {
          productsArray = res.data.products;
        }

        const ids = new Set(productsArray.map((p) => p._id || p.id));
        this._wishlistIds.set(ids);
        this._wishlistProducts.set(productsArray);
        this._isLoading.set(false);
      },
      error: () => {
        this._isLoading.set(false);
      },
    });
  }

  toggleWishlist(productId: string): void {
    if (this.isInWishlist(productId)) {
      this.removeFromWishlist(productId);
    } else {
      this.addToWishlist(productId);
    }
  }

  addToWishlist(productId: string): void {
    // Optimistic update
    this._wishlistIds.update((ids) => {
      const updated = new Set(ids);
      updated.add(productId);
      return updated;
    });

    this.http
      .post(`${this.baseUrl}/wishlist`, { productId })
      .subscribe({
        next: () => {
          this.toastr.success(
            this.translate.instant('WISHLIST.ADDED')
          );
          this.loadWishlist();
        },
        error: () => {
          // Rollback
          this._wishlistIds.update((ids) => {
            const updated = new Set(ids);
            updated.delete(productId);
            return updated;
          });
        },
      });
  }

  removeFromWishlist(productId: string): void {
    // Optimistic update
    this._wishlistIds.update((ids) => {
      const updated = new Set(ids);
      updated.delete(productId);
      return updated;
    });
    this._wishlistProducts.update((products) =>
      products.filter((p) => p._id !== productId)
    );

    this.http
      .delete(`${this.baseUrl}/wishlist/${productId}`)
      .subscribe({
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
          this.loadWishlist();
        },
      });
  }
}
