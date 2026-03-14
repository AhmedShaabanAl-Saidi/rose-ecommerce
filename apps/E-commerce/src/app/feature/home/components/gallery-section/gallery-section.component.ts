import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeadingTitleComponent } from '../../../../shared/components/ui/heading/heading-title.component';

@Component({
  selector: 'app-gallery-section',
  imports: [CommonModule, TranslateModule, HeadingTitleComponent],
  templateUrl: './gallery-section.component.html',
})
export class GallerySectionComponent {

}
