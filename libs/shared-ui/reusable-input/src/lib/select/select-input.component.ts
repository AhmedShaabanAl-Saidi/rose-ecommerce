import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { BaseInputComponent } from '../base/base-input.component';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from '../error/input-error.component';

export interface SelectOption {
  label: string;
  value: any;
}
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lib-select-input',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, InputErrorComponent, TranslatePipe],
  templateUrl: './select-input.component.html',
})
export class SelectInputComponent extends BaseInputComponent {
  options = input<SelectOption[]>([]);
  onSelectChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.value = val;
    this.onChange(val);
  }
}
