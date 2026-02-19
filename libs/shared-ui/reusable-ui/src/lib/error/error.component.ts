import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
   readonly message = input<string>('');
}
