import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthSeparatorComponent } from './components/auth-separator/auth-separator.component';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { AuthTitleComponent } from './components/auth-title/auth-title.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthPageData } from './interfaces/auth-page-data';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterOutlet, AuthSeparatorComponent, AuthBackgroundComponent, LanguageSwitcherComponent, AuthTitleComponent, AuthFooterComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  currentPageData: AuthPageData = {};

  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.getDeepestChildRoute()?.snapshot.data as AuthPageData || {}),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(data => this.currentPageData = data);
  }

  private getDeepestChildRoute(): ActivatedRoute | null {
    let route = this.activatedRoute.firstChild;
    while (route?.firstChild) route = route.firstChild;
    return route;
  }
}