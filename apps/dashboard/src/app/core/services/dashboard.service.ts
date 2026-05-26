import { inject, Injectable, signal } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError, tap } from 'rxjs';
import { AllStatsResponse, StatisticsApiResponse } from '../interfaces/dashboard.interface';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = new HttpClient(inject(HttpBackend));
  private readonly router = inject(Router);
  private readonly baseUrl = environment.baseUrl;

  // State management using Signals
  readonly statistics = signal<AllStatsResponse | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  loadAllStatistics(): Observable<AllStatsResponse> {
    this.loading.set(true);
    this.error.set(null);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjlkZWFjOGU2YmJhZjE1ODhiYmMxOTg0Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzkwMTgwMzZ9.ljOzZkaTNSzUKV7b7WYYcLuaH4_5H1ogoTZZhOxkxjg';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<StatisticsApiResponse>(`${this.baseUrl}/statistics`, { headers }).pipe(
      map(response => {
        const stats = response.statistics || response.data;
        if (!stats) {
          throw new Error('DASHBOARD.OVERVIEW.ERRORS.NO_STATISTICS_DATA');
        }
        return stats as AllStatsResponse;
      }),
      tap((data) => {
        this.statistics.set(data);
        this.loading.set(false);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/unauthorized']);
        }
        this.error.set(
          err.message || 'DASHBOARD.OVERVIEW.ERRORS.FAILED_LOAD_STATISTICS'
        );
        this.loading.set(false);
        return throwError(() => err);
      })
    );
  }
}
