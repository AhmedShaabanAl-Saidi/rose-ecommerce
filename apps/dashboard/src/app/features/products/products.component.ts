import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product, ProductsService } from '@elevate/core-data-access';
import { DashboardDataTableComponent } from '../../shared/components/dashboard-data-table/dashboard-data-table.component';
import { productsTableConfig } from './products-table.config';
import { DeleteModalComponent } from '@elevate/reusable-ui';

@Component({
  selector: 'app-products',
  imports: [DashboardDataTableComponent, DeleteModalComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly config = productsTableConfig;
  readonly products = signal<Product[] | null>(null);

  readonly isDeleteModalVisible = signal(false);
  readonly selectedItemForDelete = signal<Product | null>(null);

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => this.products.set(products));
  }

  openDeleteModal(item: Product): void {
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

    this.productsService.deleteProduct(item._id)
      .subscribe(() => {
        this.closeDeleteModal();
        this.loadProducts();
      });
  }
}
