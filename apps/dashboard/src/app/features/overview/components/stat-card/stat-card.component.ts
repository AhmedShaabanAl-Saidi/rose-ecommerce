import { Component, input, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

type StatCardColor = 'rose' | 'blue' | 'purple' | 'green';

@Component({
  selector: 'app-stat-card',

  imports: [CommonModule],
  providers: [DecimalPipe],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  icon = input.required<string>();
  colorType = input<StatCardColor>('rose');

  private decimalPipe = inject(DecimalPipe);

  formatValue(val: string | number): string {
    if (typeof val === 'number') {
      if (this.colorType() === 'green') {
        return `EGP ${this.decimalPipe.transform(val, '1.0-0') || ''}`;
      }
      return this.decimalPipe.transform(val, '1.0-0') || '';
    }
    return val;
  }

  getCardClasses(): string {
    return `stat-card--${this.colorType()}`;
  }

  getIconContainerClasses(): string {
    return `stat-card__icon--${this.colorType()}`;
  }

  getTextClasses(): string {
    return `stat-card__value--${this.colorType()}`;
  }

  getAccentClasses(): string {
    return `stat-card__accent--${this.colorType()}`;
  }
}
