import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRepo } from '@elevate/auth-domain';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);
  const router = inject(Router);
  const auth = inject(AuthRepo);
  const injector = inject(Injector);
  const platformId = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const translate = injector.get(TranslateService);
      let message = translate.instant('ERRORS.UNEXPECTED');

      switch (err.status) {
        case 0:
          message = translate.instant('ERRORS.NETWORK');
          break;
        case 401:
          message = translate.instant('ERRORS.UNAUTHORIZED');
          auth.cleanData();
          if (isPlatformBrowser(platformId)) router.navigate(['/auth/login']);
          break;
        case 403:
          message = translate.instant('ERRORS.FORBIDDEN');
          break;
        default:
          if (err.status >= 500) {
            message = translate.instant('ERRORS.SERVER');
          } else {
            message =
              typeof err.error === 'string'
                ? err.error
                : err.error?.message || err.error?.error || message;
          }
      }

      if (err.status === 0) {
        message = 'Network error: Please check your connection';
      } else if (err.status >= 500) {
        message = 'Server error: Please try again later';
      }

      const isTokenError =
        err.status === 401 &&
        (message.toLowerCase().includes('jwt') ||
          message.toLowerCase().includes('token'));

      if (isPlatformBrowser(platformId)) {
        if (isTokenError) {
          message = 'Your session has expired. Please log in again.';
          auth.cleanData();
          router.navigateByUrl('/auth/login', { replaceUrl: true });
        }

        toast.error(message);
      }

      return throwError(() => ({ message, status: err.status }));
    })
  );
};
