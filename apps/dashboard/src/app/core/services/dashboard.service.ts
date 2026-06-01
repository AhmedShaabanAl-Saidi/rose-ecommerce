import { inject, Injectable, signal } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@elevate/core-data-access';
import { catchError, finalize, map, Observable, tap, throwError } from 'rxjs';
import {
  AllStatsResponse,
  StatisticsApiResponse,
} from '../interfaces/dashboard.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = new HttpClient(inject(HttpBackend));
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly toastr = inject(ToastrService);
  private readonly loading = inject(LoadingService);
  private readonly baseUrl = environment.baseUrl;

  readonly statistics = signal<AllStatsResponse | null>(null);

  loadAllStatistics(): Observable<AllStatsResponse> {
    this.loading.showLoading();

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjlkZWFjOGU2YmJhZjE1ODhiYmMxOTg0Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzkwMTgwMzZ9.ljOzZkaTNSzUKV7b7WYYcLuaH4_5H1ogoTZZhOxkxjg';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http
      .get<StatisticsApiResponse>(`${this.baseUrl}/statistics`, { headers })
      .pipe(
        map((response) => {
          const stats = response.statistics || response.data;
          if (!stats) {
            throw new Error('DASHBOARD.OVERVIEW.ERRORS.NO_STATISTICS_DATA');
          }
          return stats as AllStatsResponse;
        }),
        tap((data) => this.statistics.set(data)),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/unauthorized']);
          }
          this.toastr.error(
            this.translate.instant(
              err.message || 'DASHBOARD.OVERVIEW.ERRORS.FAILED_LOAD_STATISTICS'
            )
          );
          return throwError(() => err);
        }),
        finalize(() => this.loading.hideLoading())
      );
  }
}
