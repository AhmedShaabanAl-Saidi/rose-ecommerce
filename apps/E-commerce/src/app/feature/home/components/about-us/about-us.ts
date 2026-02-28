import { Component, inject, computed } from '@angular/core';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, ArrowLeft } from 'lucide-angular';
import { languageService } from '../../../../core/services/language-service';

@Component({
  selector: 'app-about-us',
  imports: [ButtonComponent, TranslateModule, LucideAngularModule, RouterLink],
  templateUrl: './about-us.html',
})
export class AboutUs {
  private readonly langService = inject(languageService);

  readonly arrowIcon = computed(() =>
    this.langService.isRTL() ? ArrowLeft : ArrowRight
  );

  readonly features = [
    'ABOUT_SECTION.FEATURE_1',
    'ABOUT_SECTION.FEATURE_2',
    'ABOUT_SECTION.FEATURE_3',
    'ABOUT_SECTION.FEATURE_4',
  ];
}
