import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  output,
} from '@angular/core';
import { LucideAngularModule, Loader2 } from 'lucide-angular';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  readonly Loader2 = Loader2;
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly block = input(false);
  readonly icon = input<any>(null);
  readonly iconPos = input<'left' | 'right'>('left');
  readonly click = output<MouseEvent>();

  readonly classes = computed(() => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

    const variants: Record<ButtonVariant, string> = {
      primary:
        'bg-[var(--color-btn-bg)] text-[var(--color-btn-text)] hover:bg-[var(--color-maroon-700)] shadow-sm',
      secondary:
        'bg-[var(--color-bg-secondary)] text-white hover:bg-[var(--color-soft-pink-600)] shadow-sm',
      outline:
        'border border-[var(--color-btn-outline-bg)] bg-transparent hover:bg-[var(--color-bg-surface)] text-[var(--color-btn-outline-text)]',
      ghost:
        'hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-main)]',
      link: 'text-[var(--color-btn-bg)] underline-offset-4 hover:underline',
    };

    const sizes: Record<ButtonSize, string> = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-11 px-8 text-base',
    };

    return [
      baseClasses,
      variants[this.variant()],
      sizes[this.size()],
      this.block() ? 'w-full' : '',
      this.disabled() || this.loading() ? 'opacity-50 cursor-not-allowed' : '',
    ].join(' ');
  });

  onClick(event: MouseEvent) {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.click.emit(event);
  }
}
