import { Component, output } from '@angular/core';
import { CategoryFilterComponent } from './category-filter/category-filter.component';

@Component({
  selector: 'app-filters',
  imports: [CategoryFilterComponent],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  filterChange = output<{ categoryId?: string }>();

  onCategoryChange(categoryId: string | null): void {
    this.filterChange.emit({ categoryId: categoryId ?? undefined });
  }
}