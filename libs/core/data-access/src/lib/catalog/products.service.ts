import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductQueryParams, ProductsResponse, RelatedProductsResponse, ReviewResponse } from './products.interface';
import { catalogUrl, loadAllPages, productSearchParams } from './catalog-http.util';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);

  getProducts(
    query: ProductQueryParams = {},
    options: { context?: HttpContext } = {}
  ): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(catalogUrl('products'), {
      params: productSearchParams(query),
      context: options.context,
    });
  }

  getProductById(id: string): Observable<{ product: Product }> {
    return this.http.get<{ product: Product }>(catalogUrl(`products/${id}`));
  }

  getProductReviews(productId: string): Observable<ReviewResponse> {
    return this.http.get<ReviewResponse>(
      catalogUrl(`products/${productId}/reviews`)
    );
  }

  getRelatedProductByID(productId: string): Observable<RelatedProductsResponse> {
    return this.http.get<RelatedProductsResponse>(
      catalogUrl(`related/category/${productId}`)
    );
  }

  getAllProducts(limit = 40): Observable<Product[]> {
    return loadAllPages(
      (page) => this.getProducts({ page, limit }),
      (res) => res.products
    );
  }
}
