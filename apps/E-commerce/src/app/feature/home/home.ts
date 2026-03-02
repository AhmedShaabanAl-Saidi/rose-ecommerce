import { Component } from '@angular/core';
import { MostPopular } from './components/most-popular/most-popular';
import { TrustedByComponent } from './components/trusted/trusted-by.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { FeaturesBarComponent } from './components/features-bar/features-bar.component';

@Component({
  selector: 'app-home',
  imports: [TrustedByComponent, TestimonialComponent, FeaturesBarComponent , MostPopular],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}