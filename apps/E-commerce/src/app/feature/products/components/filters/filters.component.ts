import { ChangeDetectionStrategy, Component, computed, output, signal, viewChild } from '@angular/core';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { OccasionFilterComponent } from './occasion-filter/occasion-filter.component';
import { RatingFilterComponent } from './rating-filter/rating-filter.component';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { FilterState } from '../../interfaces/product';
import { ButtonComponent } from '@elevate/reusable-ui';
import { RotateCcw } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-filters',
  imports: [CategoryFilterComponent, OccasionFilterComponent, RatingFilterComponent, PriceFilterComponent, ButtonComponent, TranslatePipe],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  readonly ResetAllIcon = RotateCcw;
  readonly filterChange = output<FilterState>();

  private readonly categoryFilter = viewChild(CategoryFilterComponent);
  private readonly occasionFilter = viewChild(OccasionFilterComponent);
  private readonly ratingFilter = viewChild(RatingFilterComponent);
  private readonly priceFilter = viewChild(PriceFilterComponent);
  private readonly currentState = signal<FilterState>({});

  readonly hasActiveFilters = computed(() => {
    const state = this.currentState();
    return (
      state.categoryId !== undefined ||
      state.occasionId !== undefined ||
      state.rating !== undefined ||
      state.priceFrom !== undefined ||
      state.priceTo !== undefined
    );
  });

  private updateFilterState(partialState: Partial<FilterState>): void {
    const nextState = { ...this.currentState(), ...partialState };
    this.currentState.set(nextState);
    this.filterChange.emit(nextState);
  }

  onCategoryChange(categoryId: string | null): void {
    this.updateFilterState({ categoryId: categoryId ?? undefined });
  }

  onOccasionChange(occasionId: string | null): void {
    this.updateFilterState({ occasionId: occasionId ?? undefined });
  }

  onRatingChange(rating: number | null): void {
    this.updateFilterState({ rating: rating ?? undefined });
  }

  onPriceChange(priceRange: { from?: number; to?: number } | null): void {
    this.updateFilterState({
      priceFrom: priceRange?.from,
      priceTo: priceRange?.to,
    });
  }

  resetAllFilters(): void {
    if (!this.hasActiveFilters()) {
      return;
    }

    this.categoryFilter()?.onReset(false);
    this.occasionFilter()?.onReset(false);
    this.ratingFilter()?.onReset(false);
    this.priceFilter()?.onReset(false);

    this.currentState.set({});
    this.filterChange.emit({});
  }
}