import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import {
  LanguageService,
  ThemeService,
} from '@elevate/theme';

@Component({
  selector: 'app-dashboard-layout',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  imports: [RouterOutlet, SidebarComponent, BreadcrumbComponent],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  constructor() {
    inject(LanguageService);
    inject(ThemeService);
  }
}
