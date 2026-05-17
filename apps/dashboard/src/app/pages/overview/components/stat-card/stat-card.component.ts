import { Component, input, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe, DecimalPipe],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  icon = input.required<string>();
  colorType = input<'rose' | 'blue' | 'purple' | 'green'>('rose');

  private currencyPipe = inject(CurrencyPipe);
  private decimalPipe = inject(DecimalPipe);

  formatValue(val: string | number): string {
    if (typeof val === 'number') {
      if (this.colorType() === 'green') {
        return this.currencyPipe.transform(val, 'EGP', 'symbol', '1.0-0') || '';
      }
      return this.decimalPipe.transform(val, '1.0-0') || '';
    }
    return val;
  }

  getCardClasses(): string {
    switch (this.colorType()) {
      case 'rose':
        return 'bg-rose-50';
      case 'blue':
        return 'bg-blue-50';
      case 'purple':
        return 'bg-purple-50';
      case 'green':
        return 'bg-emerald-50';
      default:
        return 'bg-zinc-50';
    }
  }

  getIconContainerClasses(): string {
    switch (this.colorType()) {
      case 'rose':
        return 'text-rose-500';
      case 'blue':
        return 'text-blue-500';
      case 'purple':
        return 'text-purple-500';
      case 'green':
        return 'text-emerald-500';
      default:
        return 'text-zinc-500';
    }
  }

  getTextClasses(): string {
    switch (this.colorType()) {
      case 'rose':
        return 'text-rose-500';
      case 'blue':
        return 'text-blue-500';
      case 'purple':
        return 'text-purple-500';
      case 'green':
        return 'text-emerald-500';
      default:
        return 'text-zinc-800';
    }
  }
}
