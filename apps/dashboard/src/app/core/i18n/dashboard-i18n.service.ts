import { inject, provideEnvironmentInitializer } from '@angular/core';
import { LanguageService, type LanguageTranslations } from '@elevate/theme';
import arTranslations from '../../../../public/i18n/ar.json';
import enTranslations from '../../../../public/i18n/en.json';

const dashboardTranslations = {
  en: { DASHBOARD: enTranslations.DASHBOARD },
  ar: { DASHBOARD: arTranslations.DASHBOARD },
} satisfies LanguageTranslations;

export function provideDashboardI18n() {
  return provideEnvironmentInitializer(() =>
    inject(LanguageService).registerTranslations(dashboardTranslations)
  );
}
