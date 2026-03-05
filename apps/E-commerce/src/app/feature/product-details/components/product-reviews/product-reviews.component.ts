import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { HeadingTitleComponent } from '../../../../shared/components/ui/heading/heading-title.component';
import { Review } from '../../../products/models/review.models';
import { TextInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';

@Component({
  selector: 'app-product-reviews',
  imports: [
    DatePipe,
    HeadingTitleComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css',
})
export class ProductReviewsComponent {
  reviews = input.required<Review[]>();

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
