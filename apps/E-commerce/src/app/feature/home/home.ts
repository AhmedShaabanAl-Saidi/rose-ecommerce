import { Component } from '@angular/core';
import { TrustedByComponent } from './components/trusted/trusted-by.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';

@Component({
  selector: 'app-home',
  imports: [TrustedByComponent, TestimonialComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
