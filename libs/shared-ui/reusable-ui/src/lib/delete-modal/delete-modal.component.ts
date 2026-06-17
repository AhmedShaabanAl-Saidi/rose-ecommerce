import { Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-delete-modal',
  imports: [ButtonComponent, TranslateModule],
  template: `
    @if (visible()) {
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all"
      >
        <!-- Close Button -->
        <button
          type="button"
          (click)="onCancel()"
          class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <span class="sr-only">Close panel</span>
          <i class="pi pi-times text-xl"></i>
        </button>

        <!-- Icon -->
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
        >
          <i class="pi pi-trash text-2xl text-red-500"></i>
        </div>

        <!-- Title / Message -->
        <h3
          class="mb-6 text-lg font-medium leading-6 text-gray-900"
          id="modal-title"
        >
          {{ message() | translate }}
        </h3>

        <!-- Actions -->
        <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <lib-button
            variant="outline"
            class="w-full sm:w-auto"
            (buttonClick)="onCancel()"
          >
            {{ cancelText() | translate }}
          </lib-button>

          <lib-button
            variant="destructive"
            class="w-full sm:w-auto"
            [loading]="isLoading()"
            (buttonClick)="onConfirm()"
          >
            {{ confirmText() | translate }}
          </lib-button>
        </div>
      </div>
    </div>
    }
  `,
})
export class DeleteModalComponent {
  readonly visible = input(false);
  readonly message = input('COMMON.DELETE_CONFIRM');
  readonly confirmText = input('COMMON.CONFIRM');
  readonly cancelText = input('COMMON.CANCEL');
  readonly isLoading = input(false);

  readonly confirm = output<void>();
  readonly cancel = output<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
