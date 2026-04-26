import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepo } from '@elevate/auth-domain';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, PasswordModule],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authRepo = inject(AuthRepo);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);

  isLoading = false;

  passwordForm: FormGroup = this.fb.group(
    {
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const payload = {
      password: this.passwordForm.value.password,
      newPassword: this.passwordForm.value.newPassword,
    };

    this.authRepo.changePassword(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success(
          this.translate.instant('PASSWORD_CHANGED_SUCCESSFULLY') ||
            'Password changed successfully'
        );
        this.passwordForm.reset();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
