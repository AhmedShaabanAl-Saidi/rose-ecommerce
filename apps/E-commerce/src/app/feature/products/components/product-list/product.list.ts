import { Component, DestroyRef, computed, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { ProductQueryParams } from '../../interfaces/product';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';
import { PaginatorComponent } from '../../../../shared/components/ui/paginator/paginator.component';
import { ProductCardComponent } from '../../../../shared/components/ui/product-card/product-card.component';
import { ProductsService } from '../../services/product';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, SearchX } from 'lucide-angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.list.html',
  imports: [ProductCardComponent, PaginatorComponent, TranslatePipe, LucideAngularModule],
})
export class ProductList {
  readonly SearchXIcon = SearchX;
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  categoryId = input<string | undefined>(undefined);
  occasionId = input<string | undefined>(undefined);
  rating = input<number | undefined>(undefined);

  emptyMessageKey = computed(() => {
    let activeFilters = 0;
    if (this.categoryId()) activeFilters++;
    if (this.occasionId()) activeFilters++;
    if (this.rating() !== undefined) activeFilters++;
    
    if (activeFilters === 0) return 'There are no products available';
    if (activeFilters === 1) {
      if (this.categoryId()) return 'There are no products in this Category';
      if (this.occasionId()) return 'There are no products for this Occasion';
      if (this.rating() !== undefined) return 'There are no products with this Rating';
    }
    return 'No products match the selected filters';
  });

  first = signal(0);
  rows = signal(12);
  totalProducts = signal(0);
  allProducts = signal<Product[]>([]);
  isLoading = signal(true);
  showPaginator = computed(() => !this.isLoading() && this.totalProducts() > this.rows());

  constructor() {
    effect(() => {
      const categoryId = this.categoryId();
      const occasionId = this.occasionId();
      const rating = this.rating();
      this.first.set(0);
      this.getproducts({ page: 1, limit: this.rows(), categoryId, occasionId, rating });
    });
  }

  getproducts(params: ProductQueryParams = {}): void {
    const page = params.page ?? 1;
    const limit = params.limit ?? this.rows();
    const categoryId = params.categoryId;
    const occasionId = params.occasionId;
    const rating = params.rating;

    this.isLoading.set(true);

    this.productsService
      .getProducts({ page, limit, categoryId, occasionId, rating })
      .pipe(finalize(() => this.isLoading.set(false)))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.allProducts.set(data.products);

          let actualTotal = data.metadata.totalItems;
          if (data.products.length < data.metadata.limit) {
            actualTotal = (page - 1) * data.metadata.limit + data.products.length;
          }

          this.totalProducts.set(actualTotal);
          this.rows.set(data.metadata.limit);
        },
      });
  }

  onPageChange(event: PaginatorState): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows();

    this.first.set(first);
    this.rows.set(rows);

    const page = event.page !== undefined ? event.page + 1 : first / rows + 1;

    this.getproducts({ page, limit: rows, categoryId: this.categoryId(), occasionId: this.occasionId(), rating: this.rating() });
  }
}