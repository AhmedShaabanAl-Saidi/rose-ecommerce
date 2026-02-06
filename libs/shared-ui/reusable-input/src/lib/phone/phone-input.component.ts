import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BaseInputComponent } from '../base/base-input.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@Component({
  selector: 'lib-phone-input',
  imports: [
    LucideAngularModule,
    CommonModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    BsDropdownModule,
  ],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.css',
})
export class PhoneInputComponent extends BaseInputComponent {
  get formField(): FormControl {
    return (this.control as FormControl) || new FormControl();
  }
  override get errorMessage(): string {
    const errors = this.control?.errors;
    if (errors?.['required']) return 'Phone number is required';
    if (errors?.['validatePhoneNumber'] === false)
      return 'Invalid phone number format';
    return super.errorMessage;
  }
}
