import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent {
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly type = input<'text' | 'email' | 'password' | 'number'>('text');
  readonly control = input.required<FormControl>();
  readonly errorMessage = input<string>('');
  readonly id = input<string>(`ui-input-${Math.random().toString(36).substr(2, 9)}`);

  readonly passwordVisible = signal(false);

  readonly inputType = computed(() => {
    if (this.type() === 'password') {
      return this.passwordVisible() ? 'text' : 'password';
    }
    return this.type();
  });

  readonly error = computed(() => {
    if (this.errorMessage()) return this.errorMessage();
    if (this.control().invalid && (this.control().dirty || this.control().touched)) {
      return null;
    }
    return null;
  });

  togglePasswordVisibility() {
    this.passwordVisible.update(v => !v);
  }
}
