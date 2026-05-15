import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-semibold mb-4">Products</h1>
      <p class="text-gray-600">Products list and management.</p>
    </div>
  `,
})
export class ProductsComponent {}
