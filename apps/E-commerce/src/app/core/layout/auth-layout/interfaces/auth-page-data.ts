import { Signal } from '@angular/core';

export interface AuthPageData {
    title?: string;
    description?: string;
    footerText?: string;
    footerLinkText?: string;
    footerLinkRoute?: string;
}

export interface AuthPage {
    authData: Signal<AuthPageData>;
}