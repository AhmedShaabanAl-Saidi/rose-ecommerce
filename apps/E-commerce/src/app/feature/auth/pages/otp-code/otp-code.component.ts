import { Component, signal } from '@angular/core';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-otp-code',
  imports: [],
  templateUrl: './otp-code.component.html',
})
export class OtpCodeComponent {
  readonly email = signal<string>('');

  constructor() {
    this.email.set(localStorage.getItem('email') || '');
  }
}