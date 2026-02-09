import { Component, signal } from '@angular/core';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-otp-code',
  imports: [],
  templateUrl: './otp-code.component.html',
})
export class OtpCodeComponent implements AuthPage {
  readonly authData = signal({
    footerText: 'AUTH.OTP.FOOTER_TEXT',
    footerLinkText: 'AUTH.OTP.FOOTER_LINK',
    footerLinkRoute: '/auth/forgot-password'
  });
}