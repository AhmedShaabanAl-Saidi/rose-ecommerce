import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError, tap, of } from 'rxjs';
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

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjlkZWFjOGU2YmJhZjE1ODhiYmMxOTg0Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzkwMTgwMzZ9.ljOzZkaTNSzUKV7b7WYYcLuaH4_5H1ogoTZZhOxkxjg';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<StatisticsApiResponse>(`${this.baseUrl}/statistics`, { headers }).pipe(
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
