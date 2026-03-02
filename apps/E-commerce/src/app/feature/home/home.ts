import { Component } from '@angular/core';
import { AboutUs } from './components/about-us/about-us';
import { TrustedByComponent } from './components/trusted/trusted-by.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { FeaturesBarComponent } from './components/features-bar/features-bar.component';

@Component({
  selector: 'app-home',
  imports: [AboutUs, TrustedByComponent, TestimonialComponent, FeaturesBarComponent],
  templateUrl: './home.html',
})
export class Home {}
