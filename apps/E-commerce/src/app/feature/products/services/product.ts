import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductQueryParams, ProductsResponse, CategoriesRes } from '../interfaces/product';
import { Product } from '../../../shared/components/ui/product-card/interface/product';
import { ReviewResponse } from '../interfaces/review';
import { RelatedProductsResponse } from '../interfaces/related';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  getProducts({ page = 1, limit = 12, categoryId }: ProductQueryParams = {}): Observable<ProductsResponse> {
    let params = `?page=${page}&limit=${limit}`;
    if (categoryId) {
      params += `&category=${categoryId}`;
    }
    return this.http.get<ProductsResponse>(
      `${this.baseUrl}/products${params}`
    );
  }

  getCategories(page = 1, limit = 100): Observable<CategoriesRes> {
    return this.http.get<CategoriesRes>(
      `${this.baseUrl}/categories?page=${page}&limit=${limit}`
    );
  }
  getProductById(id: string) {
    return this.http.get<{ product: Product }>(
      `${this.baseUrl}/products/${id}`
    );
  }
  getProductReviews(productId: string) {
    return this.http.get<ReviewResponse>(
      `${this.baseUrl}/products/${productId}/reviews`
    );
  }
  getRelatedProductByID(product_id: string) {
    return this.http.get<RelatedProductsResponse>(
      `${this.baseUrl}/related/category/${product_id}`
    );
  }
}