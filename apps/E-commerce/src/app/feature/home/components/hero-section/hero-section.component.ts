import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { TranslateModule } from '@ngx-translate/core';

import { HeroBannerConfig } from '../../models/home.models';
import { BottomBannerComponent } from './components/bottom-banner/bottom-banner.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, CarouselModule, BottomBannerComponent, TranslateModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  
  // Static Left Banner
  leftBanner: HeroBannerConfig = {
    title: 'HERO_SECTION.LEFT_BANNER.TITLE',
    badge: 'HERO_SECTION.LEFT_BANNER.BADGE',
    ctaText: 'HERO_SECTION.LEFT_BANNER.CTA',
    imageSrc: 'images/hero-section/hero1.webp',
    link: '/categories'
  };

  // Static Array of 4 Main Banners for Carousel
  mainBanners: HeroBannerConfig[] = [
    {
      title: 'HERO_SECTION.MAIN_BANNERS.1.TITLE',
      subtitle: 'HERO_SECTION.MAIN_BANNERS.1.SUBTITLE',
      ctaText: 'HERO_SECTION.MAIN_BANNERS.1.CTA',
      imageSrc: 'images/hero-section/hero2.webp',
      link: '/products'
    },
    {
      title: 'HERO_SECTION.MAIN_BANNERS.2.TITLE',
      subtitle: 'HERO_SECTION.MAIN_BANNERS.2.SUBTITLE',
      ctaText: 'HERO_SECTION.MAIN_BANNERS.2.CTA',
      imageSrc: 'images/hero-section/hero3.webp',
      link: '/products'
    },
    {
      title: 'HERO_SECTION.MAIN_BANNERS.3.TITLE',
      subtitle: 'HERO_SECTION.MAIN_BANNERS.3.SUBTITLE',
      ctaText: 'HERO_SECTION.MAIN_BANNERS.3.CTA',
      imageSrc: 'images/hero-section/hero4.webp',
      link: '/products'
    },
    {
      title: 'HERO_SECTION.MAIN_BANNERS.4.TITLE',
      subtitle: 'HERO_SECTION.MAIN_BANNERS.4.SUBTITLE',
      ctaText: 'HERO_SECTION.MAIN_BANNERS.4.CTA',
      imageSrc: 'images/hero-section/hero5.webp',
      link: '/products'
    }
  ];

  // Static Bottom Banners
  bottomBanners: HeroBannerConfig[] = [
    {
      title: 'HERO_SECTION.BOTTOM_BANNERS.1.TITLE',
      badge: 'HERO_SECTION.BOTTOM_BANNERS.1.BADGE',
      ctaText: 'HERO_SECTION.BOTTOM_BANNERS.1.CTA',
      imageSrc: 'images/hero-section/hero3.webp',
      link: '/occasions'
    },
    {
      title: 'HERO_SECTION.BOTTOM_BANNERS.2.TITLE',
      badge: 'HERO_SECTION.BOTTOM_BANNERS.2.BADGE',
      ctaText: 'HERO_SECTION.BOTTOM_BANNERS.2.CTA',
      imageSrc: 'images/hero-section/hero4.webp',
      link: '/occasions'
    },
    {
      title: 'HERO_SECTION.BOTTOM_BANNERS.3.TITLE',
      badge: 'HERO_SECTION.BOTTOM_BANNERS.3.BADGE',
      ctaText: 'HERO_SECTION.BOTTOM_BANNERS.3.CTA',
      imageSrc: 'images/hero-section/hero5.webp',
      link: '/occasions'
    }
  ];
}
