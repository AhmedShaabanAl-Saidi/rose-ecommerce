import { Component, input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'ui-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiErrorComponent {
  readonly message = input<string>('');
}
