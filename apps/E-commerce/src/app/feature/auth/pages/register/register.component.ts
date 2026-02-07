import { Component, signal } from '@angular/core';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements AuthPage {
  readonly authData = signal({
    title: 'AUTH.REGISTER.TITLE',
    footerText: 'AUTH.REGISTER.FOOTER_TEXT',
    footerLinkText: 'AUTH.REGISTER.FOOTER_LINK',
    footerLinkRoute: '/auth/login'
  });
}