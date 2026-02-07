import { Component } from '@angular/core';
import { AuthTitleComponent } from '../../../../core/layout/auth-layout/components/auth-title/auth-title.component';

@Component({
  selector: 'app-register',
  imports: [AuthTitleComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent { }