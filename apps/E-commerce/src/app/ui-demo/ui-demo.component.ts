import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonComponent, UiLabelComponent, UiErrorComponent } from '../shared/components/ui';

@Component({
  selector: 'app-ui-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiButtonComponent, UiLabelComponent, UiErrorComponent],
  template: `
    <div class="p-8 space-y-8 max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold">UI Components Demo</h1>
      
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Buttons</h2>
        <div class="flex flex-wrap gap-4 items-center">
          <ui-button>Default</ui-button>
          <ui-button variant="secondary">Secondary</ui-button>
          <ui-button variant="outline">Outline</ui-button>
          <ui-button variant="ghost">Ghost</ui-button>
          <ui-button variant="link">Link</ui-button>
        </div>
        <div class="flex flex-wrap gap-4 items-center">
          <ui-button size="sm">Small</ui-button>
          <ui-button size="md">Medium</ui-button>
          <ui-button size="lg">Large</ui-button>
        </div>
        <div class="flex flex-wrap gap-4 items-center">
          <ui-button [loading]="true">Loading</ui-button>
          <ui-button [disabled]="true">Disabled</ui-button>
        </div>
        <div class="flex flex-col gap-2">
            <h3 class="font-medium">Block Button</h3>
            <ui-button [block]="true">Block Button</ui-button>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Labels</h2>
        <div class="flex flex-col gap-4">
          <div class="space-y-1">
            <label ui-label>Default Label</label>
            <p class="text-sm text-gray-500">Associated with an input (conceptually)</p>
          </div>
          <div class="space-y-1">
            <label ui-label class="text-red-500">Styled Label (Red)</label>
             <p class="text-sm text-gray-500">Custom class applied</p>
          </div>
        </div>
      </section>
      
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Error Message</h2>
        <ui-error message="This is a standalone error message component." />
      </section>
    </div>
  `
})
export class UiDemoComponent {}
