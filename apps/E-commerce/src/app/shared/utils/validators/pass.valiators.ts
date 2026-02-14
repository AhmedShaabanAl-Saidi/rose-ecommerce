import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {

  const password = control.get('password');
  const confirm = control.get('rePassword');

  if (!password || !confirm) return null;

  if (confirm.errors && !confirm.errors['mismatch']) {
    return null;
  }

  if (password.value !== confirm.value) {
    confirm.setErrors({ ...confirm.errors, mismatch: true });
    return { mismatch: true };
  }

  const errors = confirm.errors;
  if (errors) {
    delete errors['mismatch'];
    confirm.setErrors(Object.keys(errors).length ? errors : null);
  }

  return null;
}
