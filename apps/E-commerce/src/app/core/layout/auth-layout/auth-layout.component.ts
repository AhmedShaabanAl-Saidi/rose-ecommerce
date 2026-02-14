import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthSeparatorComponent } from './components/auth-separator/auth-separator.component';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { AuthTitleComponent } from './components/auth-title/auth-title.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthPage, AuthPageData } from './interfaces/auth-page-data';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterOutlet, AuthSeparatorComponent, AuthBackgroundComponent, LanguageSwitcherComponent, AuthTitleComponent, AuthFooterComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  activeComponent = signal<AuthPage | null>(null);
  currentPageData = computed<AuthPageData>(() => this.activeComponent()?.authData() ?? {});

  onActivate(component: unknown) {
    if (this.isAuthPage(component)) {
      Promise.resolve().then(() => {
        this.activeComponent.set(component);
      });
    }
  }

  private isAuthPage(component: unknown): component is AuthPage {
    return (component as AuthPage).authData !== undefined;
  }
}