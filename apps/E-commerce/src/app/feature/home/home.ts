import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { HomeService } from './services/home.service';
import { Product } from '../../shared/components/ui/product-card/interface/product';

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, BestSellerComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly homeService = inject(HomeService);
  bestSellers = signal<Product[]>([]);

  ngOnInit(): void {
    this.homeService.getHomeData().subscribe((res) => {
      if (res.bestSeller) {
        this.bestSellers.set(res.bestSeller as unknown as Product[]);
      }
    });
  }
}
