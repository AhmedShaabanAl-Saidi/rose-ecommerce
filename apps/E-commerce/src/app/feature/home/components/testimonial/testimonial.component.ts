import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environments';
import { HeadingTitleComponent } from '../../../../shared/components/ui/heading/heading-title.component';
import { TESTIMONIAL_ENDPOINT } from './constants/testimonial.constant';
import {
  Testimonial,
  TestimonialResponse,
} from './interfaces/testimonial.interface';

@Component({
  selector: 'app-testimonial',
  imports: [DatePipe, HeadingTitleComponent, TranslatePipe],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css',
})
export class TestimonialComponent implements OnInit {
  testimonials = signal<Testimonial[] | null>(null);
  private readonly httpClient = inject(HttpClient);
  ngOnInit(): void {
    this.httpClient
      .get<TestimonialResponse>(environment.baseUrl + TESTIMONIAL_ENDPOINT)
      .subscribe({
        next: (data: TestimonialResponse) => {
          this.testimonials.set(data.testimonials ?? []);
        },
        error: () => this.testimonials.set([]),
      });
  }
}
