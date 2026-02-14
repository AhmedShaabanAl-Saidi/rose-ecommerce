import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'lib-input-error',
  standalone: true,
  templateUrl: './input-error.component.html',
  imports: [LucideAngularModule],
})
export class InputErrorComponent {
  control = input.required<AbstractControl | null | undefined>();
  customType = input<string>('');

  get haveError(): boolean {
    const ctrl = this.control();
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  get errorMessage(): string {
    const errors = this.control()?.errors;
    if (!errors) return '';

    if (errors['required']) return 'Field is required';
    if (errors['email']) return 'Please enter a valid email address';

    if (errors['minlength'])
      return `Minimum ${errors['minlength'].requiredLength} characters required`;

    if (errors['maxlength'])
      return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;

    if (errors['min']) return `Value must be at least ${errors['min'].min}`;
    if (errors['max']) return `Value must be no more than ${errors['max'].max}`;

    if (errors['mismatch']) return 'Fields do not match';

    if (errors['validatePhoneNumber'] === false)
      return 'Invalid phone number format';

    if (errors['pattern']) {
      if (this.customType() === 'password')
        return 'Password must be at least 8 characters with (A-z, 0-9, @$!%*?&)';
      return 'Invalid format';
    }

    if (errors['strongPassword'])
      return 'Password must contain uppercase, lowercase, number and special character';

    return 'Invalid field';
  }
}
