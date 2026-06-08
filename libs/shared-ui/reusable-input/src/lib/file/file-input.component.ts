import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BaseInputComponent } from '../base/base-input.component';
import { InputErrorComponent } from '../error/input-error.component';

@Component({
  selector: 'lib-file-input',
  imports: [CommonModule, InputErrorComponent],
  templateUrl: './file-input.component.html',
  host: {
    class: 'block w-full',
  },
})
export class FileInputComponent extends BaseInputComponent {
  accept = input('');
  multiple = input(false);

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (this.multiple()) {
      const nextValue = files ? Array.from(files) : [];
      this.value = nextValue;
      this.onChange(nextValue);
    } else {
      const nextValue = files?.item(0) ?? null;
      this.value = nextValue;
      this.onChange(nextValue);
    }

    this.onTouched();
  }

  get selectedLabel(): string {
    if (!this.value) return '';

    if (Array.isArray(this.value)) {
      return this.value
        .map((file: File | string) =>
          typeof file === 'string' ? file : file.name
        )
        .join(', ');
    }

    if (typeof this.value === 'string') {
      return this.value;
    }

    return this.value.name;
  }
}
