import { HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { CatalogMetadata } from './catalog.interface';
import { ProductQueryParams } from './products.interface';

const CATALOG_API_BASE_URL = 'https://flower.elevateegy.com/api/v1';

export function catalogUrl(endpoint: string): string {
  return `${CATALOG_API_BASE_URL}/${endpoint}`;
}

export function pageParams(page: number, limit: number): HttpParams {
  return new HttpParams().set('page', page).set('limit', limit);
}

export function productSearchParams({
  page = 1,
  limit = 12,
  keyword,
  categoryIds,
  occasionIds,
  rating,
  priceFrom,
  priceTo,
}: ProductQueryParams): HttpParams {
  let params = pageParams(page, limit);
  const search = keyword?.trim();
  if (search) params = params.set('keyword', search);
  if (rating) params = params.set('rateAvg', rating);
  if (priceFrom !== undefined) params = params.set('price[gte]', priceFrom);
  if (priceTo !== undefined) params = params.set('price[lte]', priceTo);
  categoryIds?.forEach((id) => (params = params.append('category', id)));
  occasionIds?.forEach((id) => (params = params.append('occasion', id)));
  return params;
}

export function loadAllPages<
  TItem,
  TResponse extends { metadata: CatalogMetadata }
>(
  loadPage: (page: number) => Observable<TResponse>,
  selectItems: (response: TResponse) => TItem[]
): Observable<TItem[]> {
  return loadPage(1).pipe(
    switchMap((first) => {
      const { totalPages, numberOfPages } = first.metadata;
      const pageCount = Math.max(totalPages ?? numberOfPages ?? 1, 1);
      const rest = Array.from({ length: pageCount - 1 }, (_, i) =>
        loadPage(i + 2)
      );
      return forkJoin([of(first), ...rest]).pipe(
        map((pages) => pages.flatMap(selectItems))
      );
    })
  );
}

export function toFormData(payload: Record<string, unknown>): FormData {
  const fd = new FormData();

  Object.keys(payload).forEach((key) => {
    const val = payload[key];

    if (val === undefined || val === null) return;

    if (Array.isArray(val)) {
      (val as unknown[]).forEach((item) => {
        if (item instanceof File) fd.append(key, item as File);
        else fd.append(key, String(item));
      });
      return;
    }

    if (val instanceof File) {
      fd.append(key, val as File);
      return;
    }

    // plain value (string/number/boolean)
    fd.append(key, String(val));
  });

  return fd;
}
