import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { BaseInputComponent } from '../base/base-input.component';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'lib-select-input',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
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
