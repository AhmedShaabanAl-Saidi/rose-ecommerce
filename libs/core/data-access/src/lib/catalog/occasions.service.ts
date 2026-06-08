import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OccasionsRes, Occasion } from './occasions.interface';
import { catalogUrl, loadAllPages, pageParams } from './catalog-http.util';
import { toFormData } from './catalog-http.util';

@Injectable({ providedIn: 'root' })
export class OccasionsService {
  private readonly http = inject(HttpClient);

  getOccasions(page = 1, limit = 100): Observable<OccasionsRes> {
    return this.http.get<OccasionsRes>(catalogUrl('occasions'), {
      params: pageParams(page, limit),
    });
  }

  getAllOccasions(limit = 100): Observable<Occasion[]> {
    return loadAllPages(
      (page) => this.getOccasions(page, limit),
      (res) => res.occasions
    );
  }

  createOccasion(
    payload: Record<string, any>
  ): Observable<{ occasion: Occasion }> {
    const hasFiles = Object.values(payload).some(
      (v) =>
        v instanceof File ||
        (Array.isArray(v) && v.some((i: any) => i instanceof File))
    );
    if (hasFiles) {
      return this.http.post<{ occasion: Occasion }>(
        catalogUrl('occasions'),
        toFormData(payload)
      );
    }

    return this.http.post<{ occasion: Occasion }>(
      catalogUrl('occasions'),
      payload
    );
  }

  updateOccasion(
    id: string,
    payload: Record<string, any>
  ): Observable<{ occasion: Occasion }> {
    const hasFiles = Object.values(payload).some(
      (v) =>
        v instanceof File ||
        (Array.isArray(v) && v.some((i: any) => i instanceof File))
    );
    if (hasFiles) {
      return this.http.put<{ occasion: Occasion }>(
        catalogUrl(`occasions/${id}`),
        toFormData(payload)
      );
    }

    return this.http.put<{ occasion: Occasion }>(
      catalogUrl(`occasions/${id}`),
      payload
    );
  }
}
