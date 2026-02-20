import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Theme } from '../enums/theme.enum';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);
    private document = inject(DOCUMENT);
    private cookieService = inject(SsrCookieService);

    theme = signal<Theme>(this.getInitialTheme());

    constructor() {
        effect(() => {
            const currentTheme = this.theme();
            this.document.documentElement.classList.toggle('dark', currentTheme === Theme.DARK);
            this.cookieService.set('theme', currentTheme, { path: '/', sameSite: 'Lax' });
            if (this.isBrowser) {
                localStorage.setItem('theme', currentTheme);
            }
        });
    }

    private getInitialTheme(): Theme {
        const cookieTheme = this.cookieService.get('theme') as Theme;
        if (cookieTheme) return cookieTheme;

        if (!this.isBrowser) return Theme.LIGHT;

        return (localStorage.getItem('theme') as Theme) ||
            (this.document.documentElement.classList.contains('dark') ? Theme.DARK : Theme.LIGHT);
    }

    toggleTheme() {
        this.theme.update(current => current === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
    }
}