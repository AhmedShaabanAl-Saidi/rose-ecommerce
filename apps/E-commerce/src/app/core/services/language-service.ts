import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal, computed, Renderer2, RendererFactory2, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class languageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer: Renderer2;
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private currentLangSignal = signal<string>('en');

  readonly currentLang = this.currentLangSignal.asReadonly();
  readonly isRTL = computed(() => this.currentLangSignal() === 'ar');

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.translateService.setFallbackLang('en');

    if (this.isBrowser) {
      const lang = localStorage.getItem('lang') || 'en';
      this.currentLangSignal.set(lang);
      this.translateService.use(lang);
      this.updateDocumentDirection(lang);
    }

    this.translateService.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.currentLangSignal.set(event.lang);
        this.updateDocumentDirection(event.lang);
      });
  }

  private updateDocumentDirection(language: string): void {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    const htmlElement = this.document.documentElement;

    this.renderer.setAttribute(htmlElement, 'dir', direction);
    this.renderer.setAttribute(htmlElement, 'lang', language);
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);

    if (this.isBrowser) {
      localStorage.setItem('lang', language);
    }
  }
}