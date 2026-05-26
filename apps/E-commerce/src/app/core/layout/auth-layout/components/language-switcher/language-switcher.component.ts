import { Component, inject } from '@angular/core';
import { LanguageService } from '@elevate/theme';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {
  private readonly langService = inject(LanguageService);

  readonly currentLang = this.langService.currentLang;
  readonly isRTL = this.langService.isRTL;
  readonly toggleLabel = this.langService.languageToggleLabel;
  readonly toggleAriaLabel = this.langService.languageToggleAriaLabel;

  changeLanguage(): void {
    this.langService.toggleLanguage();
  }
}
