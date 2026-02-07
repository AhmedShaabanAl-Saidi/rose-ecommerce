import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { UiButtonComponent, UiInputComponent, UiErrorComponent } from '../shared/components/ui';

@Component({
  selector: 'app-ui-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiButtonComponent, UiInputComponent, UiErrorComponent],
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
        <h2 class="text-xl font-semibold">Inputs</h2>
        <div class="space-y-4">
          <ui-input label="Email" placeholder="Enter your email" [control]="emailControl" />
          <ui-input label="Password" type="password" placeholder="Enter password" [control]="passwordControl" />
          <ui-input 
            label="With Manual Error" 
            placeholder="This has an error" 
            [control]="errorControl" 
            errorMessage="Manual error message" 
          />
        </div>
      </section>
      
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Error Message</h2>
        <ui-error message="This is a standalone error message component." />
      </section>
    </div>
  `
})
export class UiDemoComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  errorControl = new FormControl('');
}
