import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordStateService {
  private _email = signal<string>('');
  readonly email = this._email.asReadonly();

  setEmail(email: string) {
    this._email.set(email);
  }
}
