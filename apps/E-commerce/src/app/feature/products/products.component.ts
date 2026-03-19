import { Component, signal } from '@angular/core';
import { ProductList } from './components/product-list/product.list';
import { FiltersComponent } from './components/filters/filters.component';
import { FilterState } from './interfaces/product';

@Component({
  selector: 'app-products',
  imports: [ProductList, FiltersComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  selectedCategoryId = signal<string | undefined>(undefined);
  selectedOccasionId = signal<string | undefined>(undefined);

  onFilterChange(filter: FilterState): void {
    this.selectedCategoryId.set(filter.categoryId);
    this.selectedOccasionId.set(filter.occasionId);
  }
}