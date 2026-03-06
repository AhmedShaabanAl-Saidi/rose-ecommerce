import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.model';
import { Product } from '../../../shared/components/ui/product-card/interface/product';
import { ReviewResponse } from '../models/review.models';
import { RelatedProductsResponse } from '../models/related-product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = environment.baseUrl;
  private _http = inject(HttpClient);

  getProducts({
    page = 1,
    limit = 12,
    categoryId,
  }: {
    page?: number;
    limit?: number;
    categoryId?: string;
  } = {}): Observable<ProductsResponse> {
    let params = `?page=${page}&limit=${limit}`;
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
  getProductReviews(productId: string) {
    return this._http.get<ReviewResponse>(
      `${this.baseUrl}/products/${productId}/reviews`
    );
  }
  getRelatedProductByID(product_id: string) {
    return this._http.get<RelatedProductsResponse>(
      `${this.baseUrl}/related/category/${product_id}`
    );
  }
}
