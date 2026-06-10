import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { OrdersResponse } from '../interfaces/orders.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly http = inject(HttpClient);

  getOrders(page = 1, limit = 3): Observable<OrdersResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);

    return this.http.get<OrdersResponse>(`${environment.baseUrl}/orders`, {
      params,
    });
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/orders/${id}`);
  }
}