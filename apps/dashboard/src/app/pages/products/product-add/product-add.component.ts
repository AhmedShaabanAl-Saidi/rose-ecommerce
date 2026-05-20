import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p class="text-sm font-medium uppercase tracking-wide text-maroon-700">
        Product
      </p>
      <h2 class="mt-2 text-2xl font-semibold text-zinc-900">Add Product</h2>
      <p class="mt-2 text-sm text-zinc-600">
        This is the add-product child route.
      </p>

      <a
        routerLink="../"
        class="mt-4 inline-flex rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 no-underline hover:bg-zinc-50 transition-colors"
      >
        Back to products
      </a>
    </section>
  `,
})
export class ProductAddComponent {}
