import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthSeparatorComponent } from './components/auth-separator/auth-separator.component';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterOutlet, AuthSeparatorComponent, AuthBackgroundComponent, LanguageSwitcherComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent { }