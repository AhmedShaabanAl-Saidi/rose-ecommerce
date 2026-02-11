import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthRepo } from '@elevate/auth-domain';
import { AuthPage, AuthPageData } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';
import { UiButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { TextInputComponent } from '@elevate/reusable-input';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, UiButtonComponent, TextInputComponent],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements AuthPage {
  private readonly auth = inject(AuthRepo);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly authData = signal<AuthPageData>({
    title: 'AUTH.FORGOT_PASSWORD.TITLE',
    description: 'AUTH.FORGOT_PASSWORD.DESCRIPTION',
    footerText: 'AUTH.FORGOT_PASSWORD.FOOTER_TEXT',
    footerLinkText: 'AUTH.FORGOT_PASSWORD.FOOTER_LINK',
    footerLinkRoute: '/auth/login',
    titleStyle: 'simple'
  });

  readonly isLoading = signal<boolean>(false);

  readonly forgotPasswordForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
  });

  submit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const payload = this.forgotPasswordForm.getRawValue();

    this.auth.forgetPassword(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/auth/login']);
        }
      });
  }
}