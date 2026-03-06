import { Component } from '@angular/core';
import { ProductList } from './component/product-list/product.list';

@Component({
  selector: 'app-products',
  imports: [ProductList],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {}
