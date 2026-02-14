import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthRepo } from '@elevate/auth-domain';
import { AuthPage, AuthPageData } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';
import { UiButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { TextInputComponent, CheckboxInputComponent } from '@elevate/reusable-input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, UiButtonComponent, TextInputComponent, CheckboxInputComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent implements AuthPage {
  private readonly auth = inject(AuthRepo);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly authData = signal<AuthPageData>({
    title: 'AUTH.LOGIN.TITLE',
    footerText: 'AUTH.LOGIN.FOOTER_TEXT',
    footerLinkText: 'AUTH.LOGIN.FOOTER_LINK',
    footerLinkRoute: '/auth/register'
  });

  readonly isLoading = signal<boolean>(false);

  readonly loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    rememberMe: new FormControl(false, { nonNullable: true }),
  });

  submitLoginForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { rememberMe, ...payload } = this.loginForm.getRawValue();
    this.auth.login(payload, rememberMe)

      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.loginForm.reset();
          this.router.navigate(['/home']);
        }
      });
  }
}