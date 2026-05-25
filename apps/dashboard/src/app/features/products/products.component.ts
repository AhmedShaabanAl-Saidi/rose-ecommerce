import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="p-8 max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-semibold mb-2">Products</h1>
          <p class="text-gray-600">Products list and management.</p>
        </div>

        <div class="flex items-center gap-3">
          <a
            routerLink="add"
            class="rounded-lg bg-maroon-700 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-maroon-800 transition-colors"
          >
            Add Product
          </a>
          <a
            routerLink="edit"
            class="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 no-underline hover:bg-zinc-50 transition-colors"
          >
            Edit Product
          </a>
        </div>
      </div>

      <div class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-zinc-500">Product list area</p>
        <p class="mt-2 text-gray-600">Products list and management.</p>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class ProductsComponent {}
