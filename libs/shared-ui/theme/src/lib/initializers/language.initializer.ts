import { DOCUMENT } from '@angular/common';
import { inject, provideAppInitializer } from '@angular/core';
import { TranslateService, type TranslationObject } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { firstValueFrom } from 'rxjs';
import type { Language } from '../types/language.type';
import type { LanguageTranslations } from '../services/language.service';

export function provideLanguageInitializer(
  translations?: LanguageTranslations
) {
  return provideAppInitializer(() => {
    const document = inject(DOCUMENT);
    const cookieService = inject(SsrCookieService);
    const translateService = inject(TranslateService);

    const lang = normalizeLanguage(cookieService.get('lang') || 'en');
    const direction = lang === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', lang);

    if (translations) {
      registerTranslations(translateService, translations);
    }

    translateService.setFallbackLang('en');
    return firstValueFrom(translateService.use(lang));
  });
}

function registerTranslations(
  translateService: TranslateService,
  translations: LanguageTranslations
): void {
  for (const language of ['en', 'ar'] as const) {
    const languageTranslations = translations[language];
    if (languageTranslations) {
      translateService.setTranslation(
        language,
        languageTranslations as TranslationObject,
        true
      );
    }
  }
}

function normalizeLanguage(language: string): Language {
  return language === 'ar' ? 'ar' : 'en';
}
