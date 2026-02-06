import { Component, input } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { BaseInputComponent } from '../base/base-input.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'lib-otp-input',
  standalone: true,
  imports: [NgOtpInputModule, LucideAngularModule],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.css',
})
export class OtpInputComponent extends BaseInputComponent {
  length = input<number>(6);

  onOtpChange(value: string) {
    this.value = value;
    this.onChange(value); 
    this.onTouched(); 
  }

  get config() {
    return {
      length: this.length(),
      allowNumbersOnly: true,
      inputClass: 'otp-input-style',
      containerClass: 'otp-container',
    };
  }
  override get errorMessage(): string {
    const errors = this.control?.errors;
    if (!errors) return '';
    if (errors['required']) return 'Field is required';
    if (errors['minlength'])
      return `Minimum ${errors['minlength'].requiredLength} Number required`;
    if (errors['maxlength'])
      return `Maximum ${errors['maxlength'].requiredLength} Number allowed`;
    return 'Invalid field';
  }
}
