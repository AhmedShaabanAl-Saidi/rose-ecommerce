import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Paginator } from 'primeng/paginator';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';
import { ProductCardComponent } from '../../../../shared/components/ui/product-card/product-card.component';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.list.html',
  styleUrls: ['./product.list.css'],
  imports: [ProductCardComponent, Paginator],
})
export class ProductList implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  first = signal(0);
  rows = signal(12);
  totalProducts = signal(0);
  allProducts = signal<Product[]>([]);
  ngOnInit(): void {
    this.getproducts();
  }
  getproducts(page = 1, limit: number = this.rows()) {
    this.productsService
      .getProducts({ page, limit })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.allProducts.set(data.products);
          this.totalProducts.set(data.metadata.totalItems);
          this.rows.set(data.metadata.limit);
        },
      });
  }

  onPageChange(event: any) {
    this.first.set(event.first);
    this.rows.set(event.rows);

    const page = event.first / event.rows + 1;

    this.getproducts(page, event.rows);
  }
}
