import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthModel, AuthRepo } from '@elevate/auth-domain';
import {
  AuthPage,
  AuthPageData,
} from '../../../../core/layout/auth-layout/interfaces/auth-page-data';
import { ButtonComponent } from '@elevate/reusable-ui';
import {
  TextInputComponent,
  CheckboxInputComponent,
} from '@elevate/reusable-input';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TextInputComponent,
    CheckboxInputComponent,
    ButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements AuthPage {
  private readonly auth = inject(AuthRepo);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toaster = inject(ToastrService);
  readonly authData = signal<AuthPageData>({
    title: 'AUTH.LOGIN.TITLE',
    footerText: 'AUTH.LOGIN.FOOTER_TEXT',
    footerLinkText: 'AUTH.LOGIN.FOOTER_LINK',
    footerLinkRoute: '/auth/register',
  });

  readonly isLoading = signal<boolean>(false);

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    rememberMe: new FormControl(false, { nonNullable: true }),
  });

  submitLoginForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { rememberMe, ...payload } = this.loginForm.getRawValue();
    this.auth
      .login(payload, rememberMe)

      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (res: AuthModel) => {
          this.loginForm.reset();
          this.toaster.success(res.message);
          this.router.navigate(['/home']);
        },
      });
  }
}
