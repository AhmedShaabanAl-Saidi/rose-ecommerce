import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '@elevate/reusable-ui';
import { ArrowLeft, ArrowRight } from 'lucide-angular';

@Component({
    selector: 'app-footer',
    imports: [CommonModule, RouterModule, TranslatePipe, ButtonComponent, ReactiveFormsModule],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    translate: TranslateService = inject(TranslateService);
    readonly arrowLeft = ArrowLeft;
    readonly arrowRight = ArrowRight;
    emailControl = new FormControl('', [Validators.required, Validators.email]);

    footerLinks = [
        { label: 'FOOTER.HOME', route: '/' },
        { label: 'FOOTER.PRODUCTS', route: '/products' },
        { label: 'FOOTER.CATEGORIES', route: '/categories' },
        { label: 'FOOTER.OCCASIONS', route: '/occasions' },
        { label: 'FOOTER.CONTACT', route: '/contact' },
        { label: 'FOOTER.ABOUT', route: '/about' },
        { label: 'FOOTER.TERMS_CONDITIONS', route: '/terms' },
        { label: 'FOOTER.PRIVACY_POLICY', route: '/privacy' },
        { label: 'FOOTER.FAQS', route: '/faqs' }
    ];
}
