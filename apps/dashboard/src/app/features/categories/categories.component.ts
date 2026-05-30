import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category, CategoriesService } from '@elevate/core-data-access';
import { DashboardDataTableComponent } from '../../shared/components/dashboard-data-table/dashboard-data-table.component';
import { categoriesTableConfig } from './categories-table.config';

@Component({
  selector: 'app-categories',
  imports: [DashboardDataTableComponent],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly config = categoriesTableConfig;
  readonly categories = signal<Category[] | null>(null);

  constructor() {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories) => this.categories.set(categories));
  }
}
