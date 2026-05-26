import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-add',
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <section class="rounded-2xl border border-zinc-200 bg-white p-6 text-start shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
      <p class="text-sm font-medium uppercase tracking-wide text-maroon-700 dark:text-soft-pink-200">
        {{ 'DASHBOARD.PAGES.PRODUCTS.SECTION' | translate }}
      </p>
      <h2 class="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        {{ 'DASHBOARD.PAGES.PRODUCTS.ADD_TITLE' | translate }}
      </h2>
      <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {{ 'DASHBOARD.PAGES.PRODUCTS.ADD_DESCRIPTION' | translate }}
      </p>

      <a
        routerLink="../"
        class="mt-4 inline-flex rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 no-underline transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        {{ 'DASHBOARD.PAGES.PRODUCTS.BACK_TO_PRODUCTS' | translate }}
      </a>
    </section>
  `,
})
export class ProductAddComponent {}
