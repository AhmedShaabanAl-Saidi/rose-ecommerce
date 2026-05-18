import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError, tap } from 'rxjs';
import { AllStatsResponse, StatisticsApiResponse } from '../interfaces/dashboard.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  // State management using Signals
  readonly statistics = signal<AllStatsResponse | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  loadAllStatistics(): Observable<AllStatsResponse> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<StatisticsApiResponse>(`${this.baseUrl}/statistics`).pipe(
      map(response => {
        const stats = response.statistics || response.data;
        if (!stats) {
          throw new Error('No statistics data found in response');
        }
        return stats as AllStatsResponse;
      }),
      tap((data) => {
        this.statistics.set(data);
        this.loading.set(false);
      }),
      catchError((err) => {
        this.error.set(err.message || 'Failed to load statistics');
        this.loading.set(false);
        return throwError(() => err);
      })
    );
  }
}
