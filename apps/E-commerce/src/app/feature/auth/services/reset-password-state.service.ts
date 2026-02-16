import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordState {
  private _email = signal<string | null>(null);
  readonly email = this._email.asReadonly();
  private _step = signal<1 | 2 | 3>(1);
  readonly step = this._step.asReadonly();
  setEmail(email: string | null) {
    this._email.set(email);
  }
  setStep(step: 1 | 2 | 3) {
    this._step.set(step);
  }
}
