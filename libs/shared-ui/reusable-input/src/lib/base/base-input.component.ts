import { Component, inject, input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'lib-base-input',
  imports: [],
  template: '',
})
export abstract class BaseInputComponent implements ControlValueAccessor {
  ngControl = inject(NgControl, { optional: true, self: true });
  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  label = input<string>('');
  placeholder = input<string>('');
  icon = input<string>('');
  isDisabled = false;
  value: any = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (val: any) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  get control() {
    return this.ngControl?.control;
  }
  get Invalid(): boolean {
    return !!(this.control?.touched && this.control?.invalid);
  }
  get errorMessage(): string {
    const errors = this.control?.errors;
    if (!errors) return '';

    if (errors['required']) return 'Field is required';
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength'])
      return `Minimum ${errors['minlength'].requiredLength} characters required`;
    if (errors['maxlength'])
      return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;
    if (errors['mismatch']) return 'Fields do not match';
    if (errors['min']) return `Value must be at least ${errors['min'].min}`;
    if (errors['max']) return `Value must be no more than ${errors['max'].max}`;

    return 'Invalid field';
  }
}
