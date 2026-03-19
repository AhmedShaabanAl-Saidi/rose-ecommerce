import { Component, output } from '@angular/core';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { OccasionFilterComponent } from './occasion-filter/occasion-filter.component';
import { RatingFilterComponent } from './rating-filter/rating-filter.component';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { FilterState } from '../../interfaces/product';

@Component({
  selector: 'app-filters',
  imports: [CategoryFilterComponent, OccasionFilterComponent, RatingFilterComponent, PriceFilterComponent],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  filterChange = output<FilterState>();

  private currentState: FilterState = {};

  onCategoryChange(categoryId: string | null): void {
    this.currentState = { ...this.currentState, categoryId: categoryId ?? undefined };
    this.filterChange.emit(this.currentState);
  }

  onOccasionChange(occasionId: string | null): void {
    this.currentState = { ...this.currentState, occasionId: occasionId ?? undefined };
    this.filterChange.emit(this.currentState);
  }

  onRatingChange(rating: number | null): void {
    this.currentState = { ...this.currentState, rating: rating ?? undefined };
    this.filterChange.emit(this.currentState);
  }

  onPriceChange(priceRange: { from?: number; to?: number } | null): void {
    this.currentState = { 
      ...this.currentState, 
      priceFrom: priceRange?.from, 
      priceTo: priceRange?.to 
    };
    this.filterChange.emit(this.currentState);
  }
}