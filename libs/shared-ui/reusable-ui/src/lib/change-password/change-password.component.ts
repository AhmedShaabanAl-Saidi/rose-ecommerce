import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthRepo } from '@elevate/auth-domain';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { TextInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '../button/button.component';

const matchFieldsValidator = (
  field: string,
  confirmField: string
): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(field);
    const confirmControl = group.get(confirmField);

    if (!control || !confirmControl) return null;

    if (confirmControl.errors && !confirmControl.errors['mismatch']) {
      return null;
    }

    if (control.value !== confirmControl.value) {
      confirmControl.setErrors({
        ...confirmControl.errors,
        mismatch: true,
      });
      return { mismatch: true };
    }

    const errors = confirmControl.errors;
    if (errors) {
      delete errors['mismatch'];
      confirmControl.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  };
};

@Component({
  selector: 'lib-change-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authRepo = inject(AuthRepo);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);

  isLoading = signal(false);

  passwordForm: FormGroup = this.fb.group(
    {
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
    },
    {
      validators: matchFieldsValidator('newPassword', 'rePassword'),
    }
  );

  ngOnInit(): void {
    setTimeout(() => {
      this.passwordForm.markAsPristine();
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const payload = {
      password: this.passwordForm.value.password,
      newPassword: this.passwordForm.value.newPassword,
    };

    this.authRepo
      .changePassword(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.toastr.success(
            this.translate.instant('PROFILE_PAGE.PASSWORD_UPDATE_SUCCESS')
          );
          formDirective.resetForm();
          this.passwordForm.reset();
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }
}
