import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { LanguageService, Theme, ThemeService } from '@elevate/theme';

@Component({
  selector: 'app-theme-switcher',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent {
  readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);
  readonly Moon = Moon;
  readonly Sun = Sun;
  readonly Theme = Theme;
  readonly toggleAriaLabel = computed(() =>
    this.themeService.getToggleAriaLabel(this.languageService.currentLang())
  );
}
