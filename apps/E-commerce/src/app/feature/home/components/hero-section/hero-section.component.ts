import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

import { HeroBannerConfig } from '../../models/home.models';
import { FeaturesBarComponent } from '../features-bar/features-bar.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, CarouselModule, FeaturesBarComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  
  // Static Left Banner
  leftBanner: HeroBannerConfig = {
    title: 'Special Gifts For The People You Love',
    badge: 'Starting from 10.99 EGP',
    ctaText: 'Shop Now',
    imageSrc: 'images/hero-section/hero1.webp',
    link: '/categories'
  };

  // Static Array of 4 Main Banners for Carousel
  mainBanners: HeroBannerConfig[] = [
    {
      title: 'Say It with Flowers',
      subtitle: 'Elegant gifts for every special moment.',
      ctaText: "I'm buying!",
      imageSrc: 'images/hero-section/hero2.webp',
      link: '/products'
    },
    {
      title: 'Perfect Gifts For Him',
      subtitle: 'Discover our curated luxury collection.',
      ctaText: 'Shop Collection',
      imageSrc: 'images/hero-section/hero3.webp',
      link: '/products'
    },
    {
      title: 'Celebrate with Joy',
      subtitle: 'Make it unforgettable with the perfect surprise.',
      ctaText: 'Discover',
      imageSrc: 'images/hero-section/hero4.webp',
      link: '/products'
    },
    {
      title: 'Love & Romance',
      subtitle: 'Express your feelings beautifully and deeply.',
      ctaText: 'View More',
      imageSrc: 'images/hero-section/hero5.webp',
      link: '/products'
    }
  ];

  // Static Bottom Banners
  bottomBanner1: HeroBannerConfig = {
    title: "Celebrate Her Forever with a Gift She'll Always Remember",
    badge: 'Wedding',
    ctaText: 'Shop Collection',
    imageSrc: 'images/hero-section/hero3.webp',
    link: '/occasions'
  };

  bottomBanner2: HeroBannerConfig = {
    title: "Honor the Beginning of a Beautiful Journey Together",
    badge: 'Engagement',
    ctaText: 'Shop Collection',
    imageSrc: 'images/hero-section/hero4.webp',
    link: '/occasions'
  };

  bottomBanner3: HeroBannerConfig = {
    title: "Mark Every Year of Love with a Meaningful Surprise",
    badge: 'Anniversary',
    ctaText: 'Shop Collection',
    imageSrc: 'images/hero-section/hero5.webp',
    link: '/occasions'
  };
}
