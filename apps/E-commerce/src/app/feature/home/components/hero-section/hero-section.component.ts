import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { HomeService } from '../../services/home.service';
import { CategoryOrOccasion, HeroBannerConfig } from '../../models/home.models';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  private readonly homeService = inject(HomeService);

  // Directly convert the Observable into an Angular Signal, tying its lifecycle gracefully to the component implicitly.
  private homeData = toSignal(this.homeService.getHomeData());

  // Derive granular, strictly-typed data streams from the main API signal using computed
  categories = computed(() => this.homeData()?.categories ?? []);
  occasions = computed(() => this.homeData()?.occasions ?? []);

  // Features bar (Static)
  features = [
    { icon: 'pi pi-truck', title: 'Free Delivery', subtitle: 'For orders above 120 EGP' },
    { icon: 'pi pi-sync', title: 'Get Refund', subtitle: 'Refunds within 30 days' },
    { icon: 'pi pi-shield', title: 'Safe Payment', subtitle: '100% Secure Payment' },
    { icon: 'pi pi-headphones', title: '24/7 Support', subtitle: 'Contact us at any time' }
  ];

  // Map API data to the 5 specific banner slots
  leftBanner = computed<HeroBannerConfig>(() => ({
    title: 'Special Gifts For The People You Love',
    badge: 'Starting from 10.99 EGP',
    ctaText: 'Shop Now',
    imageSrc: this.categories().length > 0 ? this.categories()[0].image : 'images/hero-section/hero1.webp',
    link: '/categories'
  }));

  mainBanner = computed<HeroBannerConfig>(() => ({
    title: 'Say It with Flowers',
    subtitle: 'Elegant gifts for every special moment.',
    ctaText: "I'm buying!",
    imageSrc: this.categories().length > 1 ? this.categories()[1].image : 'images/hero-section/hero2.webp',
    link: '/products'
  }));

  // Helper mapping to grab specific occasions or use fallbacks
  private getOccasionBanner(name: string, fallbackImg: string, customTitle: string): HeroBannerConfig {
    const occ = this.occasions().find(o => o.name.toLowerCase() === name.toLowerCase());
    return {
      title: customTitle,
      badge: occ ? occ.name : name,
      ctaText: 'Shop Collection',
      imageSrc: occ ? occ.image : fallbackImg,
      link: `/occasions/${occ?._id || ''}`
    };
  }

  bottomBanner1 = computed<HeroBannerConfig>(() => 
    this.getOccasionBanner('Wedding', 'images/hero-section/hero3.webp', "Celebrate Her Forever with a Gift She'll Always Remember")
  );

  bottomBanner2 = computed<HeroBannerConfig>(() => 
    this.getOccasionBanner('Engagement', 'images/hero-section/hero4.webp', "Honor the Beginning of a Beautiful Journey Together")
  );

  bottomBanner3 = computed<HeroBannerConfig>(() => 
    this.getOccasionBanner('Anniversary', 'images/hero-section/hero5.webp', "Mark Every Year of Love with a Meaningful Surprise")
  );
}
