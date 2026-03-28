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
  readonly appliedFilters = signal<FilterState>({});

  onFilterChange(filter: FilterState): void {
    this.appliedFilters.set(filter);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}