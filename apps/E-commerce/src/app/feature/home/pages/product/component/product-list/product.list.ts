import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Paginator } from 'primeng/paginator';
import { ProductsSidebarComponent } from '../sidebar/sidebar';
import { ProductCardComponent } from 'apps/E-commerce/src/app/shared/components/ui/product-card/product-card.component';
import { Product } from 'apps/E-commerce/src/app/shared/components/ui/product-card/interface/product';
import { FooterComponent } from 'apps/E-commerce/src/app/core/layout/main-layout/components/footer/footer.component';
import { TopNavbarComponent } from 'apps/E-commerce/src/app/core/layout/main-layout/components/navbar/top-navbar/top-navbar.component';
import { AuthLayoutComponent } from 'apps/E-commerce/src/app/core/layout/auth-layout/auth-layout.component';
import { MainNavbarComponent } from 'apps/E-commerce/src/app/core/layout/main-layout/components/navbar/main-navbar/main-navbar.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.list.html',
  styleUrls: ['./product.list.css'],
  imports: [
    ProductCardComponent,
    Paginator,
    ProductsSidebarComponent,
    FooterComponent,
    TopNavbarComponent,
    AuthLayoutComponent,
    MainNavbarComponent,
  ],
})
export class ProductList {
  private readonly _http = inject(HttpClient);
  private readonly productsService = inject(ProductsService);
  private readonly dr = inject(DestroyRef);

  first: number = 0;
  rows: number = 10;
  totalProducts: number = 19;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  allProducts: Product[] = [];

  getproducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntilDestroyed(this.dr))
      .subscribe({
        next: (data) => {
          this.allProducts = data.products;
        },
      });
  }

  ngOnInit(): void {
    this.getproducts();
  }
}
