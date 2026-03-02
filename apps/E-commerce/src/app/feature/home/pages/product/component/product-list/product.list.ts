import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Paginator } from "primeng/paginator";
import { ProductsSidebarComponent } from "../sidebar/sidebar";
import { ProductCardComponent } from 'apps/E-commerce/src/app/shared/components/ui/product-card/product-card.component';
import { Product } from 'apps/E-commerce/src/app/shared/components/ui/product-card/interface/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.list.html',
  styleUrls: ['./product.list.css'],
  imports: [ProductCardComponent, Paginator, ProductsSidebarComponent],
})
export class ProductList {
  private readonly _http = inject(HttpClient);
  private readonly productsService = inject(ProductsService);

  first: number = 0;
rows: number = 10;
totalProducts: number = 19;

onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

}


  allProducts: Product[] = [];

  getproducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data.products;
      },
    });
  }

  ngOnInit(): void {
    this.getproducts();
  }
}
