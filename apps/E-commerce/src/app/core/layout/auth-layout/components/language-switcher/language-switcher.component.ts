import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-language-switcher',
    imports: [],
    templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {
    private readonly translate = inject(TranslateService);
    currentLang = this.translate.getFallbackLang() || 'en';

    changeLanguage() {
        const newLang = this.currentLang === 'en' ? 'ar' : 'en';
        this.translate.use(newLang);
        this.currentLang = newLang;
        document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    }
}