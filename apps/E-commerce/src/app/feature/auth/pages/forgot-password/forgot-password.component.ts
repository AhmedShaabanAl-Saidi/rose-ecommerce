import { Component, signal } from '@angular/core';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements AuthPage {
  readonly authData = signal({
    footerText: 'AUTH.FORGOT_PASSWORD.FOOTER_TEXT',
    footerLinkText: 'AUTH.FORGOT_PASSWORD.FOOTER_LINK',
    footerLinkRoute: '/auth/login'
  });
}