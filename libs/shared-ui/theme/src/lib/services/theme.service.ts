import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Theme } from '../enums/theme.enum';
import type { Language } from '../types/language.type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly document = inject(DOCUMENT);
  private readonly cookieService = inject(SsrCookieService);

  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      this.document.documentElement.classList.toggle(
        'dark',
        currentTheme === Theme.DARK
      );
      this.cookieService.set('theme', currentTheme, {
        path: '/',
        sameSite: 'Lax',
      });
    });
  }

  toggleTheme(): void {
    this.theme.update((current) =>
      current === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  }

  getToggleAriaLabel(language: Language): string {
    if (language === 'ar') {
      return this.theme() === Theme.LIGHT
        ? '\u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0625\u0644\u0649 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062f\u0627\u0643\u0646'
        : '\u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0625\u0644\u0649 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062a\u062d';
    }

    return this.theme() === Theme.LIGHT
      ? 'Switch to dark theme'
      : 'Switch to light theme';
  }

  private getInitialTheme(): Theme {
    const cookieTheme = this.cookieService.get('theme') as Theme;
    if (cookieTheme === Theme.LIGHT || cookieTheme === Theme.DARK) {
      return cookieTheme;
    }

    if (!this.isBrowser) return Theme.LIGHT;

    return this.document.documentElement.classList.contains('dark')
      ? Theme.DARK
      : Theme.LIGHT;
  }
}
