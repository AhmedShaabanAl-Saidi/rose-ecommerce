import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, Renderer2, RendererFactory2, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService, type TranslationObject } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { take } from 'rxjs';
import type { Language } from '../types/language.type';

export type LanguageTranslations = Partial<Record<Language, TranslationObject>>;

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly cookieService = inject(SsrCookieService);
  private readonly document = inject(DOCUMENT);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer: Renderer2;

  private readonly currentLangSignal = signal<Language>(
    this.getInitialLanguage()
  );

  readonly currentLang = this.currentLangSignal.asReadonly();
  readonly isRTL = computed(() => this.currentLangSignal() === 'ar');
  readonly languageToggleLabel = computed(() =>
    this.currentLangSignal() === 'en'
      ? '\u0627\u0644\u0639\u0631\u0628\u064a\u0629'
      : 'English'
  );
  readonly languageToggleAriaLabel = computed(() =>
    this.currentLangSignal() === 'en'
      ? 'Switch language to Arabic'
      : '\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0644\u063a\u0629 \u0625\u0644\u0649 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629'
  );

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.updateDocumentDirection(this.currentLangSignal());

    this.translateService.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const language = this.normalizeLanguage(event.lang);
        this.currentLangSignal.set(language);
        this.updateDocumentDirection(language);
      });
  }

  registerTranslations(translations: LanguageTranslations): void {
    for (const language of ['en', 'ar'] as const) {
      const languageTranslations = translations[language];
      if (languageTranslations) {
        this.translateService.setTranslation(
          language,
          languageTranslations,
          true
        );
      }
    }
  }

  changeLanguage(language: Language | string): void {
    const nextLanguage = this.normalizeLanguage(language);
    this.currentLangSignal.set(nextLanguage);
    this.updateDocumentDirection(nextLanguage);
    this.cookieService.set('lang', nextLanguage, {
      path: '/',
      sameSite: 'Lax',
    });
    this.translateService.use(nextLanguage).pipe(take(1)).subscribe();
  }

  toggleLanguage(): void {
    this.changeLanguage(this.currentLangSignal() === 'en' ? 'ar' : 'en');
  }

  private updateDocumentDirection(language: Language): void {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    const htmlElement = this.document.documentElement;

    this.renderer.setAttribute(htmlElement, 'dir', direction);
    this.renderer.setAttribute(htmlElement, 'lang', language);
  }

  private getInitialLanguage(): Language {
    const cookieLanguage = this.cookieService.get('lang');
    if (this.isSupportedLanguage(cookieLanguage)) return cookieLanguage;

    const translateLanguage = this.translateService.getCurrentLang();
    if (this.isSupportedLanguage(translateLanguage)) return translateLanguage;

    const documentLanguage = this.document.documentElement.lang;
    if (this.isSupportedLanguage(documentLanguage)) return documentLanguage;

    return 'en';
  }

  private normalizeLanguage(language: string): Language {
    return this.isSupportedLanguage(language) ? language : 'en';
  }

  private isSupportedLanguage(
    language: string | null | undefined
  ): language is Language {
    return language === 'en' || language === 'ar';
  }
}
