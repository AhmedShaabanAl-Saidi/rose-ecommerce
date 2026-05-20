import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  @Input() title: string = 'This page does not exist.';
  @Input() description: string = 'We couldn\'t find the page your are looking for, please make sure you are in the right path.';
}
