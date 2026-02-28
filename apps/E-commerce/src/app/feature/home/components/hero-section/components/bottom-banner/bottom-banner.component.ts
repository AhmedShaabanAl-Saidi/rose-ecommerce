import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeroBannerConfig } from '../../../../models/home.models';

@Component({
  selector: 'app-bottom-banner',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './bottom-banner.component.html'
})
export class BottomBannerComponent {
  @Input({ required: true }) banner!: HeroBannerConfig;
}
