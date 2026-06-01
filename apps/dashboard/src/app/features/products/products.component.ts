import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product, ProductsService } from '@elevate/core-data-access';
import { DashboardDataTableComponent } from '../../shared/components/dashboard-data-table/dashboard-data-table.component';
import { productsTableConfig } from './products-table.config';

@Component({
  selector: 'app-products',
  imports: [DashboardDataTableComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly config = productsTableConfig;
  readonly products = signal<Product[] | null>(null);

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => this.products.set(products));
  }
}
