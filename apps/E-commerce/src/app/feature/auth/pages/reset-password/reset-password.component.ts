import { Component, signal } from '@angular/core';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-reset-password',
  imports: [],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements AuthPage {
  readonly authData = signal({
    footerLinkText: 'AUTH.RESET_PASSWORD.FOOTER_LINK',
    footerLinkRoute: '/auth/login'
  });
}