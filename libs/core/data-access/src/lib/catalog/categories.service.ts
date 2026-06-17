import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesRes, Category } from './categories.interface';
import { catalogUrl, loadAllPages, pageParams } from './catalog-http.util';
import { toFormData } from './catalog-http.util';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly http = inject(HttpClient);

  getCategories(page = 1, limit = 100): Observable<CategoriesRes> {
    return this.http.get<CategoriesRes>(catalogUrl('categories'), {
      params: pageParams(page, limit),
    });
  }

  getAllCategories(limit = 100): Observable<Category[]> {
    return loadAllPages(
      (page) => this.getCategories(page, limit),
      (res) => res.categories
    );
  }

  createCategory(
    payload: Record<string, any>
  ): Observable<{ category: Category }> {
    const hasFiles = Object.values(payload).some(
      (v) =>
        v instanceof File ||
        (Array.isArray(v) && v.some((i: any) => i instanceof File))
    );
    if (hasFiles) {
      return this.http.post<{ category: Category }>(
        catalogUrl('categories'),
        toFormData(payload)
      );
    }

    return this.http.post<{ category: Category }>(
      catalogUrl('categories'),
      payload
    );
  }

  updateCategory(
    id: string,
    payload: Record<string, any>
  ): Observable<{ category: Category }> {
    const hasFiles = Object.values(payload).some(
      (v) =>
        v instanceof File ||
        (Array.isArray(v) && v.some((i: any) => i instanceof File))
    );
    if (hasFiles) {
      return this.http.put<{ category: Category }>(
        catalogUrl(`categories/${id}`),
        toFormData(payload)
      );
    }

    return this.http.put<{ category: Category }>(
      catalogUrl(`categories/${id}`),
      payload
    );
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(catalogUrl(`categories/${id}`));
  }
}
