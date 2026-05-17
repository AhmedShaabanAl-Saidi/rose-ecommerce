import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError, tap } from 'rxjs';
import { AllStatsResponse, StatisticsApiResponse } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://flower.elevateegy.com/api/v1';

  // State management using Signals
  readonly statistics = signal<AllStatsResponse | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  loadAllStatistics(): Observable<AllStatsResponse> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<StatisticsApiResponse>(`${this.baseUrl}/statistics`).pipe(
      map((res) => {
        const data = (res?.statistics || res?.data || res) as AllStatsResponse | undefined;
        if (!data || !data.overall) {
          throw new Error('Invalid statistics API structure');
        }
        return data;
      }),
      tap((data) => {
        this.statistics.set(data);
        this.loading.set(false);
      }),
      catchError((err) => {
        this.loading.set(false);
        const errMsg = err?.error?.message || err?.message || 'Failed to fetch dashboard statistics from server';
        this.error.set(errMsg);
        return throwError(() => err);
      })
    );
  }
}
