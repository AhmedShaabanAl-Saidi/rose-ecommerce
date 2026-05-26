import { Component, input, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-stat-card',

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
        return 'bg-rose-50 dark:bg-rose-950/30 dark:border-rose-500/20';
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-950/30 dark:border-blue-500/20';
      case 'purple':
        return 'bg-purple-50 dark:bg-purple-950/30 dark:border-purple-500/20';
      case 'green':
        return 'bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-500/20';
      default:
        return 'bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800';
    }
  }

  getIconContainerClasses(): string {
    switch (this.colorType()) {
      case 'rose':
        return 'text-rose-500 dark:text-rose-300';
      case 'blue':
        return 'text-blue-500 dark:text-blue-300';
      case 'purple':
        return 'text-purple-500 dark:text-purple-300';
      case 'green':
        return 'text-emerald-500 dark:text-emerald-300';
      default:
        return 'text-zinc-500 dark:text-zinc-300';
    }
  }

  getTextClasses(): string {
    switch (this.colorType()) {
      case 'rose':
        return 'text-rose-500 dark:text-rose-200';
      case 'blue':
        return 'text-blue-500 dark:text-blue-200';
      case 'purple':
        return 'text-purple-500 dark:text-purple-200';
      case 'green':
        return 'text-emerald-500 dark:text-emerald-200';
      default:
        return 'text-zinc-800 dark:text-zinc-100';
    }
  }
}
