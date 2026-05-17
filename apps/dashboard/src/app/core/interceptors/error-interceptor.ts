import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError, timer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);

  return next(req).pipe(
    retry({
      count: 2,
      delay: (error: HttpErrorResponse, retryCount: number) => {
        const isIdempotent = ['GET', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'].includes(req.method);
        if (isIdempotent && (error.status === 0 || error.status >= 500)) {
          return timer(1000 * retryCount);
        }
        return throwError(() => error);
      },
    }),
    catchError((err: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (err.status === 0) {
        errorMessage = 'Network error: Please check your internet connection.';
      } else if (err.status >= 500) {
        errorMessage = 'Server error: Please try again later.';
      } else if (err.error && typeof err.error === 'string') {
        errorMessage = err.error;
      } else if (err.error && err.error.message) {
        errorMessage = err.error.message;
      } else if (err.error && err.error.error) {
        errorMessage = err.error.error;
      }

      toast.error(errorMessage, 'Error');

      return throwError(() => err);
    })
  );
};
