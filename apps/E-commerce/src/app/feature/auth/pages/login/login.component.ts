import { Component } from '@angular/core';
import { AuthTitleComponent } from '../../../../core/layout/auth-layout/components/auth-title/auth-title.component';

@Component({
  selector: 'app-login',
  imports: [AuthTitleComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent { }