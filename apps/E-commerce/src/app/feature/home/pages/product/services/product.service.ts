import { environment } from '../../../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.model';
import { Product } from 'apps/E-commerce/src/app/shared/components/ui/product-card/interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = environment.baseUrl;
  private _http = inject(HttpClient);

  getProducts(
    page: number = 1,
    categoryId?: string
  ): Observable<ProductsResponse> {
    let params = `?page=${page}`;
    if (categoryId) {
      params += `&category=${categoryId}`;
    }
    return this._http.get<ProductsResponse>(
      `${this.baseUrl}/products${params}`
    );
  }

  getProductById(id: string) {
    return this._http.get<{ product: Product }>(
      `${this.baseUrl}/products/${id}`
    );
  }

  addToWishlist(id: string) :Observable<any> {
    return this._http.post(`${this.baseUrl}/wishlist`, { productId: id });
  }

  getWishlist() {
    return this._http.get<{ products: Product[] }>(`${this.baseUrl}/wishlist`);
  }
}
