import {
  Component,
  DestroyRef,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';
import { PaginatorComponent } from '../../../../shared/components/ui/paginator/paginator.component';
import { ProductCardComponent } from '../../../../shared/components/ui/product-card/product-card.component';
import { ProductsService } from '../../services/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.list.html',
  imports: [ProductCardComponent, PaginatorComponent],
})
export class ProductList implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  first = signal(0);
  rows = signal(12);
  totalProducts = signal(0);
  allProducts = signal<Product[]>([]);
  isLoading = signal(true);
  showPaginator = computed(
    () => !this.isLoading() && this.totalProducts() > this.rows()
  );

  ngOnInit(): void {
    this.getproducts();
  }

  getproducts(page = 1, limit: number = this.rows()): void {
    this.isLoading.set(true);

    this.productsService
      .getProducts({ page, limit })
      .pipe(finalize(() => this.isLoading.set(false)))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.allProducts.set(data.products);
          this.totalProducts.set(data.metadata.totalItems);
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

    this.getproducts(page, rows);
  }
}