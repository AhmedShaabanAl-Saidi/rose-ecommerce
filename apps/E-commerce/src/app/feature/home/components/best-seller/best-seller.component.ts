import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductCardComponent } from '../../../../shared/components/ui/product-card/product-card.component';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    CarouselModule,
    ProductCardComponent,
  ],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.css',
})
export class BestSellerComponent {
  bestSellers = input.required<Product[]>();

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '1200px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
