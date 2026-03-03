import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from '../../../../environments/environments';
import { HomeApiResponse } from '../models/home.models';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  // Cache the stream since Home data is heavily reused across many Home components (Hero, Gallery, etc.)
  // shareReplay(1) prevents duplicate HTTP network calls identical data.
  private homeData$?: Observable<HomeApiResponse>;

  getHomeData(): Observable<HomeApiResponse> {
    if (!this.homeData$) {
      this.homeData$ = this._http.get<HomeApiResponse>(`${this.baseUrl}/home`).pipe(
        shareReplay(1),
        catchError(this.handleError)
      );
    }
    return this.homeData$;
  }

  // Centralized robust error handling for this feature service
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown API error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side/network error
      errorMessage = `Network/Client Error: ${error.error.message}`;
    } else {
      // Backend/API returned an unsuccessful response code
      errorMessage = `Backend Error (Code ${error.status}): ${error.message}`;
    }
    // Log softly to console for dev awareness without breaking the app flow harshly
    console.error('[HomeService]', errorMessage);
    
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Failed to load Home data. Please try again later.'));
  }
}
