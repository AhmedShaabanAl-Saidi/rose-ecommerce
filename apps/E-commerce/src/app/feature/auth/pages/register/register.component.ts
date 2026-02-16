import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
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
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { ValidationsUtils } from '../../../../shared/utils/validators/validators-utils';
import {
  AuthPage,
  AuthPageData,
} from '../../../../core/layout/auth-layout/interfaces/auth-page-data';

interface PhoneValue {
  e164Number: string;
  internationalNumber?: string;
  nationalNumber?: string;
  countryCode?: string;
}

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    PhoneInputComponent,
    SelectInputComponent,
    ButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements AuthPage {
  private readonly auth = inject(AuthRepo);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);

  readonly authData = signal<AuthPageData>({
    title: 'AUTH.REGISTER.TITLE',
    footerText: 'AUTH.REGISTER.FOOTER_TEXT',
    footerLinkText: 'AUTH.REGISTER.FOOTER_LINK',
    footerLinkRoute: '/auth/login',
  });

  readonly isLoading = signal(false);

  readonly authForm = new FormGroup(
    {
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(20)],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      phone: new FormControl<string | PhoneValue>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      gender: new FormControl<'male' | 'female' | ''>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(ValidationsUtils.passwordPattern),
        ],
        nonNullable: true,
      }),
      rePassword: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    },
    {
      validators: ValidationsUtils.matchFieldsValidator('password', 'rePassword'),
    }
  );

  readonly genderOptions = [
    { label: this.translate.instant('AUTH.REGISTER.MALE'), value: 'male' },
    { label: this.translate.instant('AUTH.REGISTER.FEMALE'), value: 'female' },
  ];

  submit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const formValue = this.authForm.getRawValue();

    const phoneValue = formValue.phone;
    const phone = typeof phoneValue === 'string'
      ? phoneValue
      : (phoneValue as PhoneValue).e164Number;

    const payload = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: phone,
      gender: formValue.gender as 'male' | 'female',
      password: formValue.password,
      rePassword: formValue.rePassword,
    };

    this.auth
      .register(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.toastr.success(
            this.translate.instant('AUTH.REGISTER.SUCCESS')
          );
          this.router.navigate(['/auth/login']);
        },
      });
  }
}