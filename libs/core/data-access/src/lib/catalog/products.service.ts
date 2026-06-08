import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Product,
  ProductQueryParams,
  ProductsResponse,
  RelatedProductsResponse,
  ReviewResponse,
} from './products.interface';
import {
  catalogUrl,
  loadAllPages,
  productSearchParams,
} from './catalog-http.util';
import { toFormData } from './catalog-http.util';

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

  getRelatedProductByID(
    productId: string
  ): Observable<RelatedProductsResponse> {
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

  createProduct(
    payload: Record<string, any>
  ): Observable<{ product: Product }> {
    const hasFiles = Object.values(payload).some(
      (v) =>
        v instanceof File ||
        (Array.isArray(v) && v.some((i: any) => i instanceof File))
    );
    if (hasFiles) {
      return this.http.post<{ product: Product }>(
        catalogUrl('products'),
        toFormData(payload)
      );
    }

    return this.http.post<{ product: Product }>(
      catalogUrl('products'),
      payload
    );
  }

  updateProduct(
    id: string,
    payload: Record<string, any>
  ): Observable<{ product: Product }> {
    const hasFiles = Object.values(payload).some(
      (v) =>
        v instanceof File ||
        (Array.isArray(v) && v.some((i: any) => i instanceof File))
    );
    if (hasFiles) {
      return this.http.put<{ product: Product }>(
        catalogUrl(`products/${id}`),
        toFormData(payload)
      );
    }

    return this.http.put<{ product: Product }>(
      catalogUrl(`products/${id}`),
      payload
    );
  }
}
