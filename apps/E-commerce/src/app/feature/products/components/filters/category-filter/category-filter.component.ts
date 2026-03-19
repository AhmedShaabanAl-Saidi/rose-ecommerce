import { Component, DestroyRef, OnInit, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category } from '../../../interfaces/product';
import { ProductsService } from '../../../services/product';
import { FilterResetBtnComponent } from '../filter-reset-btn/filter-reset-btn.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-category-filter',
  imports: [FilterResetBtnComponent, TranslatePipe, LucideAngularModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css',
})
export class CategoryFilterComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  categories = signal<Category[]>([]);
  selectedCategoryId = signal<string | null>(null);
  isLoading = signal(true);

  categoryChange = output<string | null>();

  ngOnInit(): void {
    this.fetchCategories();
  }

  private fetchCategories(): void {
    this.isLoading.set(true);
    this.productsService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          const sorted = [...data.categories].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          this.categories.set(sorted);
          this.isLoading.set(false);
        }
      });
  }

  selectCategory(id: string): void {
    if (this.selectedCategoryId() === id) {
      this.selectedCategoryId.set(null);
      this.categoryChange.emit(null);
    } else {
      this.selectedCategoryId.set(id);
      this.categoryChange.emit(id);
    }
  }

  onReset(emitChange = true): void {
    this.selectedCategoryId.set(null);

    if (emitChange) {
      this.categoryChange.emit(null);
    }
  }
}