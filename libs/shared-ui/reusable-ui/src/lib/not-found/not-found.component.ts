import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lib-not-found',

  imports: [CommonModule, TranslatePipe],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  @Input() title: string = 'NOT_FOUND.TITLE';
  @Input() description: string = 'NOT_FOUND.DESCRIPTION';
}
