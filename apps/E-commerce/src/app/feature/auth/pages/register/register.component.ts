import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRepo } from '@elevate/auth-domain';
import {
  PhoneInputComponent,
  SelectInputComponent,
  TextInputComponent,
} from '@elevate/reusable-input';
import { UiButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { ToastrService } from 'ngx-toastr';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    PhoneInputComponent,
    SelectInputComponent,
    UiButtonComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements AuthPage {
  readonly authData = signal({
    title: 'AUTH.REGISTER.TITLE',
    footerText: 'AUTH.REGISTER.FOOTER_TEXT',
    footerLinkText: 'AUTH.REGISTER.FOOTER_LINK',
    footerLinkRoute: '/auth/login',
  });

  authForm!: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly authRepo = inject(AuthRepo);
  private readonly toaster = inject(ToastrService);
  private readonly router = inject(Router);
  formInit() {
    this.authForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(5)]],
        lastName: ['', [Validators.required, Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        gender: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        rePassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  ngOnInit(): void {
    this.formInit();
  }
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ ...rePassword.errors, mismatch: true });
      return { mismatch: true };
    } else {
      const errors = rePassword?.errors;
      if (errors) {
        delete errors['mismatch'];
        rePassword?.setErrors(Object.keys(errors).length ? errors : null);
      }
      return null;
    }
  }

  submit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.authForm.value,
      phone: this.authForm.value.phone?.e164Number,
    };

    this.authRepo.register(payload).subscribe({
      next: () => {
        this.toaster.success('Registration successful');
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
