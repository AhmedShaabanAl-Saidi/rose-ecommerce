import { Component } from '@angular/core';
import { ProductList } from './components/product-list/product.list';

@Component({
  selector: 'app-products',
  imports: [ProductList],
  templateUrl: './products.component.html',
})
export class ProductsComponent { }