import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Theme } from '../enums/theme.enum';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    theme = signal<Theme>(this.getInitialTheme());

    constructor() {
        effect(() => {
            if (this.isBrowser) {
                const currentTheme = this.theme();
                document.documentElement.classList.toggle('dark', currentTheme === Theme.DARK);
                localStorage.setItem('theme', currentTheme);
            }
        });
    }

    private getInitialTheme(): Theme {
        if (!this.isBrowser) return Theme.LIGHT;

        return (localStorage.getItem('theme') as Theme) ||
            (document.documentElement.classList.contains('dark') ? Theme.DARK : Theme.LIGHT);
    }

    toggleTheme() {
        this.theme.update(current => current === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
    }
}