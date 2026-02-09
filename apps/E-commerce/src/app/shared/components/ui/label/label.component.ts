import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';

@Component({
  selector: 'label[ui-label]',
  standalone: true,
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './label.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClass()',
  },
})
export class UiLabelComponent {
  readonly class = input<string>('');
  
  readonly computedClass = computed(() => {
    return 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[var(--color-text-body)] ' + this.class();
  });
}
