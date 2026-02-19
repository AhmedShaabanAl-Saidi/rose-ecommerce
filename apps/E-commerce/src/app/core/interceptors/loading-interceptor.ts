import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const isExcluded =
    req.url.includes('/i18n/') ||
    req.url.includes('/profile-data') ||
    req.url.endsWith('.json');

  if (isExcluded) {
    return next(req);
  }
  const loading = inject(LoadingService);
  loading.showLoading();
  return next(req).pipe(finalize(() => loading.hideLoading()));
};
