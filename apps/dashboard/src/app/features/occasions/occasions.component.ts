import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-occasions',

  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="mx-auto max-w-4xl p-8 text-start">
      <h1 class="mb-4 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
        {{ 'DASHBOARD.PAGES.OCCASIONS.TITLE' | translate }}
      </h1>
      <p class="text-zinc-600 dark:text-zinc-400">
        {{ 'DASHBOARD.PAGES.OCCASIONS.DESCRIPTION' | translate }}
      </p>
    </div>
  `,
})
export class OccasionsComponent {}
