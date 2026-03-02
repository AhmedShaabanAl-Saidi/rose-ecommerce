import { Component } from "@angular/core";


@Component({
  selector: 'app-products-sidebar',
  templateUrl: './sidebar.html',
})

export class ProductsSidebarComponent {
  categories = [
    { name: 'Electronics', count: 120 },
    { name: 'Clothing', count: 80 },
    { name: 'Home & Kitchen', count: 60 },
    { name: 'Books', count: 40 },
    { name: 'Toys & Games', count: 30 },
  ];      }
