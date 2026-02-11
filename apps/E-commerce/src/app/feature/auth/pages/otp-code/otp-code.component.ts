import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-otp-code',
  imports: [],
  templateUrl: './otp-code.component.html',
})
export class OtpCodeComponent {
  readonly email = signal<string>('');
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.email.set(localStorage.getItem('email') || '');
    }
  }
}