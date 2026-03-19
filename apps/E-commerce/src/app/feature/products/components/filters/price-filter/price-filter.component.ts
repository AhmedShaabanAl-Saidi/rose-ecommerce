import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { FilterResetBtnComponent } from '../filter-reset-btn/filter-reset-btn.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-filter',
  imports: [FilterResetBtnComponent, TranslatePipe, FormsModule],
  templateUrl: './price-filter.component.html'
})
export class PriceFilterComponent {
  private readonly minPriceGap = 1;

  priceFrom = signal<number | null>(null);
  priceTo = signal<number | null>(null);
  minimumPriceTo = computed(() => this.priceFrom() === null ? 0 : this.priceFrom()! + this.minPriceGap);

  priceChange = output<{ from?: number; to?: number } | null>();

  onPriceFromInput(value: number | null): void {
    this.priceFrom.set(value);

    const currentTo = this.priceTo();
    if (value !== null && currentTo !== null && currentTo <= value) {
      this.priceTo.set(value + this.minPriceGap);
    }
  }

  onPriceToInput(value: number | null): void {
    const currentFrom = this.priceFrom();

    if (value !== null && currentFrom !== null && value <= currentFrom) {
      this.priceTo.set(currentFrom + this.minPriceGap);
      return;
    }

    this.priceTo.set(value);
  }

  onPriceChange(): void {
    const from = this.priceFrom() ?? undefined;
    const to = this.priceTo() ?? undefined;

    if (from === undefined && to === undefined) {
      this.priceChange.emit(null);
    } else {
      this.priceChange.emit({ from, to });
    }
  }

  onReset(): void {
    this.priceFrom.set(null);
    this.priceTo.set(null);
    this.priceChange.emit(null);
  }
}