import { Component, inject, signal } from '@angular/core';
import { AuthPage } from '../../../../core/layout/auth-layout/interfaces/auth-page-data';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthRepo } from '@elevate/auth-domain';
import { ToastrService } from 'ngx-toastr';
import {
  TextInputComponent,
  PhoneInputComponent,
  SelectInputComponent,
  InputErrorComponent,
} from '@elevate/reusable-input';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from 'apps/E-commerce/src/app/shared/components/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    PhoneInputComponent,
    SelectInputComponent,
    UiButtonComponent,
    InputErrorComponent,
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
        rePassword: ['', [Validators.required, this.passwordMatchValidator]], // Removed the individual validator here
      },
      { validators: this.passwordMatchValidator } // Group-level validator is enough
    );
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formInit();
  }
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    // Return null if they match, or an error object if they don't
    return password === rePassword ? null : { mismatch: true };
  }

  submit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    // Create a clean payload for the API
    const payload = {
      ...this.authForm.value,
      phone: this.authForm.value.phone?.e164Number, // Safe extraction
    };

    this.authRepo.register(payload).subscribe({
      next: () => {
        this.toaster.success('Registration successful');
        this.router.navigate(['/auth/login']);
      },
      // Don't forget to handle errors here too!
    });
  }
}
