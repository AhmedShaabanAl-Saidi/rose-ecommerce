import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';
import { ProdcutCarousalComponent } from '../../../../shared/components/ui/product-carousal/prodcut-carousal.component';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    CarouselModule,
    ProdcutCarousalComponent,
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
