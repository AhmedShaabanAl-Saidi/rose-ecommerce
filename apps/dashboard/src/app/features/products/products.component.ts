import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, RouterOutlet, TranslatePipe],
  template: `
    <div class="mx-auto max-w-4xl space-y-6 p-8 text-start">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h1 class="mb-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            {{ 'DASHBOARD.PAGES.PRODUCTS.TITLE' | translate }}
          </h1>
          <p class="text-zinc-600 dark:text-zinc-400">
            {{ 'DASHBOARD.PAGES.PRODUCTS.DESCRIPTION' | translate }}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <a
            routerLink="add"
            class="rounded-lg bg-maroon-700 px-4 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-maroon-800 dark:bg-soft-pink-200 dark:text-zinc-950 dark:hover:bg-soft-pink-300"
          >
            {{ 'DASHBOARD.PAGES.PRODUCTS.ADD_PRODUCT' | translate }}
          </a>
          <a
            routerLink="edit"
            class="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 no-underline transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            {{ 'DASHBOARD.PAGES.PRODUCTS.EDIT_PRODUCT' | translate }}
          </a>
        </div>
      </div>

      <div class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
        <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {{ 'DASHBOARD.PAGES.PRODUCTS.LIST_AREA' | translate }}
        </p>
        <p class="mt-2 text-zinc-600 dark:text-zinc-300">
          {{ 'DASHBOARD.PAGES.PRODUCTS.DESCRIPTION' | translate }}
        </p>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class ProductsComponent {}
