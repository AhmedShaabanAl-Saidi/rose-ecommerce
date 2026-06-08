import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Dialog } from 'primeng/dialog';
import { LucideAngularModule } from 'lucide-angular';
import {
  FileInputComponent,
  SelectInputComponent,
  TextInputComponent,
  TextareaInputComponent,
} from '@elevate/reusable-input';
import {
  DashboardEntityFormConfig,
  DashboardEntityFormField,
} from './dashboard-entity-form.config';
import { environment } from '../../../../environments/environment';

const UPLOADS_BASE = `${environment.baseUrl.replace('/api/v1', '')}/uploads`;

@Component({
  selector: 'app-dashboard-entity-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    FileInputComponent,
    SelectInputComponent,
    TextInputComponent,
    TextareaInputComponent,
    Dialog,
    LucideAngularModule,
  ],
  templateUrl: './dashboard-entity-form.component.html',
})
export class DashboardEntityFormComponent {
  readonly config = input.required<DashboardEntityFormConfig>();
  readonly mode = input.required<'add' | 'edit'>();
  readonly entityType = input.required<'categories' | 'occasions' | 'products'>();
  readonly submitted = output<void>();

  // Preview dialog state
  readonly showPreviewDialog = signal(false);
  readonly previewType = signal<'image' | 'cover' | 'gallery'>('image');
  readonly previewTitle = signal('');

  onSubmit(): void {
    this.config().form.markAllAsTouched();
    this.submitted.emit();
  }

  fieldClass(field: DashboardEntityFormField): string {
    return field.containerClass ?? 'md:col-span-1';
  }

  isRequired(fieldKey: string): boolean {
    const control = this.config().form.get(fieldKey);
    if (!control) return false;
    
    // Check if validators exist and if required is set
    if (control.validator) {
      const validator = control.validator({} as any);
      return !!(validator && validator['required']);
    }
    return false;
  }

  getImageUrl(fieldKey: string): string {
    const value = this.config().form.get(fieldKey)?.value;
    if (!value) return '';
    if (typeof value === 'string') {
      return value.startsWith('http') ? value : `${UPLOADS_BASE}/${value}`;
    }
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }
    return '';
  }

  getGalleryUrls(): string[] {
    const value = this.config().form.get('images')?.value;
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map((img: any) => {
        if (typeof img === 'string') {
          return img.startsWith('http') ? img : `${UPLOADS_BASE}/${img}`;
        }
        if (img instanceof File) {
          return URL.createObjectURL(img);
        }
        return '';
      }).filter(Boolean);
    }
    return [];
  }

  triggerPreview(type: 'image' | 'cover' | 'gallery'): void {
    this.previewType.set(type);
    
    if (type === 'image') {
      this.previewTitle.set(this.entityType() === 'categories' ? 'Category Image Preview' : 'Occasion Image Preview');
    } else if (type === 'cover') {
      this.previewTitle.set('Product Cover Preview');
    } else {
      this.previewTitle.set('Product Gallery Images');
    }

    this.showPreviewDialog.set(true);
  }

  onFileReplace(event: Event, fieldKey: string): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      if (fieldKey === 'images') {
        const nextValue = Array.from(files);
        this.config().form.patchValue({ [fieldKey]: nextValue });
        this.config().form.get(fieldKey)?.markAsDirty();
      } else {
        const nextValue = files[0];
        this.config().form.patchValue({ [fieldKey]: nextValue });
        this.config().form.get(fieldKey)?.markAsDirty();
      }
    }
  }
}
