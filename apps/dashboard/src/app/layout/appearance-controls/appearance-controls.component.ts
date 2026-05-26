import { Component, inject, input } from '@angular/core';
import { Languages, LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { LanguageService, Theme, ThemeService } from '@elevate/theme';

@Component({
  selector: 'app-appearance-controls',
  imports: [LucideAngularModule],
  templateUrl: './appearance-controls.component.html',
})
export class AppearanceControlsComponent {
  readonly compact = input(false);
  readonly language = inject(LanguageService);
  readonly theme = inject(ThemeService);
  readonly Theme = Theme;
  readonly icon = { Languages, Moon, Sun };
}
