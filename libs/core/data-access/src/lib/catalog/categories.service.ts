import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesRes, Category } from './categories.interface';
import { catalogUrl, loadAllPages, pageParams } from './catalog-http.util';

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
}
