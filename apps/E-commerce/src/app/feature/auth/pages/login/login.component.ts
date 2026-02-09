import { Component, signal } from '@angular/core';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent implements AuthPage {
  readonly authData = signal({
    title: 'AUTH.LOGIN.TITLE',
    footerText: 'AUTH.LOGIN.FOOTER_TEXT',
    footerLinkText: 'AUTH.LOGIN.FOOTER_LINK',
    footerLinkRoute: '/auth/register'
  });
}