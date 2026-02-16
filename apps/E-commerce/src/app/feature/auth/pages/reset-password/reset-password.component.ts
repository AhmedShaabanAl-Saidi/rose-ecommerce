import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRepo } from '@elevate/auth-domain';
import { TextInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';
import { ValidationsUtils } from '../../../../shared/utils/validators/validators-utils';
import { ResetPasswordStateService } from '../../services/reset-password-state.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements AuthPage, OnInit {
  private fb = inject(FormBuilder);
  private authRepo = inject(AuthRepo);
  private router = inject(Router);

  private toastr = inject(ToastrService);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private resetPasswordState = inject(ResetPasswordStateService);

  private email = '';

  constructor() {
    this.resetPasswordState.setEmail('mahmoudsami11095@gmail.com');
  }

  ngOnInit() {
    this.email = this.resetPasswordState.email();

    if (!this.email) {
      this.toastr.error(
        'Email is missing. Please try the forgot password process again.'
      );
      this.router.navigate(['/auth/forgot-password']);
    }
  }

  readonly authData = signal({
    title: 'AUTH.RESET_PASSWORD.TITLE',
    description: 'AUTH.RESET_PASSWORD.SUBTITLE',
    footerText: 'AUTH.RESET_PASSWORD.FOOTER_TEXT',
    footerLinkText: 'AUTH.RESET_PASSWORD.FOOTER_LINK',
    footerLinkRoute: '/contact',
  });

  form = this.fb.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(ValidationsUtils.passwordPattern),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: ValidationsUtils.matchFieldsValidator(
        'password',
        'confirmPassword'
      ),
    }
  );

  isLoading = signal(false);

  onSubmit() {
    if (this.form.invalid || !this.email) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const password = this.form.get('password');

    if (password?.value) {
      this.authRepo
        .resetPassword({ email: this.email, newPassword: password.value })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.isLoading.set(false))
        )
        .subscribe({
          next: () => {
            this.isLoading.set(false);
            const successMessage = this.translate.instant(
              'AUTH.RESET_PASSWORD.SUCCESS'
            );
            this.toastr.success(successMessage);
            this.router.navigate(['/auth/login']);
          },
        });
    }
  }
}
