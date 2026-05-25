import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-semibold mb-4">Categories</h1>
      <p class="text-gray-600">Manage your categories here.</p>
    </div>
  `,
})
export class CategoriesComponent {}
