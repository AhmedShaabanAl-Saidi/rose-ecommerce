import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  icon = input.required<string>();
  colorType = input<'rose' | 'blue' | 'purple' | 'green'>('rose');

  formatValue(val: string | number): string {
    if (typeof val === 'number') {
      if (this.colorType() === 'green') {
        return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(val);
      }
      return new Intl.NumberFormat('en-US').format(val);
    }
    return val;
  }

  getCardClasses(): string {
    switch (this.colorType()) {
      case 'rose':
        return 'border-rose-100/80 hover:border-rose-200';
      case 'blue':
        return 'border-blue-100/80 hover:border-blue-200';
      case 'purple':
        return 'border-purple-100/80 hover:border-purple-200';
      case 'green':
        return 'border-emerald-100/80 hover:border-emerald-200';
      default:
        return 'border-zinc-100 hover:border-zinc-200';
    }
  }

  getAccentBarClasses(): string {
    switch (this.colorType()) {
      case 'rose':
        return 'bg-rose-500';
      case 'blue':
        return 'bg-blue-500';
      case 'purple':
        return 'bg-purple-500';
      case 'green':
        return 'bg-emerald-500';
      default:
        return 'bg-zinc-500';
    }
  }

  getIconContainerClasses(): string {
    switch (this.colorType()) {
      case 'rose':
        return 'bg-rose-50 text-rose-500';
      case 'blue':
        return 'bg-blue-50 text-blue-500';
      case 'purple':
        return 'bg-purple-50 text-purple-500';
      case 'green':
        return 'bg-emerald-50 text-emerald-500';
      default:
        return 'bg-zinc-50 text-zinc-500';
    }
  }

  getGlowClasses(): string {
    switch (this.colorType()) {
      case 'rose':
        return 'bg-rose-400';
      case 'blue':
        return 'bg-blue-400';
      case 'purple':
        return 'bg-purple-400';
      case 'green':
        return 'bg-emerald-400';
      default:
        return 'bg-zinc-400';
    }
  }
}
