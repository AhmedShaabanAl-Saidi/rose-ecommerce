import { Component, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { BaseInputComponent } from '../base/base-input.component';

@Component({
  selector: 'lib-text-input',
  imports: [LucideAngularModule],
  templateUrl: './text-input.component.html',
  styleUrl:'./text-input.component.css',
})
export class TextInputComponent extends BaseInputComponent {
  type = input<'text' | 'password' | 'email'>('text');
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((val) => !val);
  }
  override get errorMessage(): string {
    const errors = this.control?.errors;
    if (!errors) return '';

    if (errors['pattern']) {
      if (this.type() === 'password')
        return 'Password must contain uppercase, lowercase and numbers';
      return 'Invalid format';
    }

    return super.errorMessage;
  }
}
