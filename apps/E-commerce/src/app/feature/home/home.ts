import { AboutUs } from './components/about-us/about-us';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { GallerySectionComponent } from './components/gallery-section/gallery-section.component';
import { TrustedByComponent } from './components/trusted/trusted-by.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { FeaturesBarComponent } from './components/features-bar/features-bar.component';
import { HomeService } from './services/home.service';
import { Product } from '../../shared/components/ui/product-card/interface/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    BestSellerComponent,
    TrustedByComponent,
    TestimonialComponent,
    FeaturesBarComponent,
    GallerySectionComponent,
    AboutUs,
  ],
  templateUrl: './home.html',
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
