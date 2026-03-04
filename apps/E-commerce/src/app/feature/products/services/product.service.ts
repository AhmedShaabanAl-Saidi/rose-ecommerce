import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.model';
import { Product } from '../../../shared/components/ui/product-card/interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = environment.baseUrl;
  private _http = inject(HttpClient);

  getProducts(
    page = 1,
    limit = 12,
    categoryId?: string
  ): Observable<ProductsResponse> {
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
}
