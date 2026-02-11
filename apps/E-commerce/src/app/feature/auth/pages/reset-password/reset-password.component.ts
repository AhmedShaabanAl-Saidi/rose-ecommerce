import { Component, signal, inject, ChangeDetectionStrategy, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';
import { AuthRepo } from '@elevate/auth-domain';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ResetPasswordStateService } from '../../services/reset-password-state.service';
import { TextInputComponent } from '@elevate/reusable-input'; 
import { UiButtonComponent } from '../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, TextInputComponent, UiButtonComponent],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
    // For manual testing uncomment the line below:
    // this.resetPasswordState.setEmail('mahmoudsami11095@gmail.com');
  }

  ngOnInit() {
      this.email = this.resetPasswordState.email();
      
      if (!this.email) {
        this.toastr.error('Email is missing. Please try the forgot password process again.');
        this.router.navigate(['/auth/forgot-password']);
      }
  }

  readonly authData = signal({
    title: 'AUTH.RESET_PASSWORD.TITLE',
    description: 'AUTH.RESET_PASSWORD.SUBTITLE',
    footerText: 'AUTH.RESET_PASSWORD.FOOTER_TEXT',
    footerLinkText: 'AUTH.RESET_PASSWORD.FOOTER_LINK',
    footerLinkRoute: '/contact'
  });

  form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  isLoading = signal(false);

  onSubmit() {
    if (this.form.invalid || !this.email) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const password = this.form.get('password')?.value;

    if (password) {
        this.authRepo.resetPassword({ email: this.email, newPassword: password })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
        next: () => {
             this.isLoading.set(false);
             const successMessage = this.translate.instant('AUTH.RESET_PASSWORD.SUCCESS');
             this.toastr.success(successMessage);
             setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        },
        error: () => {
             this.isLoading.set(false);
             // Assuming key exists or generic
             this.toastr.error('Something went wrong. Please try again.');
        }
        });
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true }); // Updated key
      return { mismatch: true };
    }
    return null;
  }
}