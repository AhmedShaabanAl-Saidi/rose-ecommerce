import { Component } from '@angular/core';
import { GallerySectionComponent } from './components/gallery-section/gallery-section.component';
import { TrustedByComponent } from './components/trusted/trusted-by.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { FeaturesBarComponent } from './components/features-bar/features-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TrustedByComponent,
    TestimonialComponent,
    FeaturesBarComponent,
    GallerySectionComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
