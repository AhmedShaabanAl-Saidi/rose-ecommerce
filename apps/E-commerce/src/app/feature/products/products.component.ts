import { Component, signal } from '@angular/core';
import { ProductList } from './components/product-list/product.list';
import { FiltersComponent } from './components/filters/filters.component';

@Component({
  selector: 'app-products',
  imports: [ProductList, FiltersComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  selectedCategoryId = signal<string | undefined>(undefined);

  onFilterChange(filter: { categoryId?: string }): void {
    this.selectedCategoryId.set(filter.categoryId);
  }
}