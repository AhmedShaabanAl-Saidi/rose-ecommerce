import { CommonModule } from '@angular/common';
import { Component, inject, OnInit,  } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'lib-register',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit  {
  resMsg = '';
  isLoading = false;
  authForm!: FormGroup;
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  formInit() {
this.authForm = this.fb.group(
  {
    firstName: ['', [Validators.required, Validators.minLength(5)]],
    lastName: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    gender: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
    rePassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
  },
  { validators: this.passwordMatchValidator }
);

  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value ===
     control.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }
  submit() {
  if (this.authForm.invalid) return;

  this.isLoading = true;
  console.log(this.authForm.value);
}


  ngOnInit(): void {
  this.formInit()
  }

   }





