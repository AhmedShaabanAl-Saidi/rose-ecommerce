import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category, CategoriesService } from '@elevate/core-data-access';
import { DashboardDataTableComponent } from '../../shared/components/dashboard-data-table/dashboard-data-table.component';
import { categoriesTableConfig } from './categories-table.config';
import { DeleteModalComponent } from '@elevate/reusable-ui';

@Component({
  selector: 'app-categories',
  imports: [DashboardDataTableComponent, DeleteModalComponent],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly config = categoriesTableConfig;
  readonly categories = signal<Category[] | null>(null);

  readonly isDeleteModalVisible = signal(false);
  readonly selectedItemForDelete = signal<Category | null>(null);

  constructor() {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories) => this.categories.set(categories));
  }

  openDeleteModal(item: Category): void {
    this.selectedItemForDelete.set(item);
    this.isDeleteModalVisible.set(true);
  }

  closeDeleteModal(): void {
    this.isDeleteModalVisible.set(false);
    this.selectedItemForDelete.set(null);
  }

  confirmDelete(): void {
    const item = this.selectedItemForDelete();
    if (!item) return;

    this.categoriesService.deleteCategory(item._id)
      .subscribe(() => {
        this.closeDeleteModal();
        this.loadCategories();
      });
  }
}
