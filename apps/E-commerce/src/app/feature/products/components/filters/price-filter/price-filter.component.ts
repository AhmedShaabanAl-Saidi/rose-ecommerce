import { Component, output, signal } from '@angular/core';
import { FilterResetBtnComponent } from '../filter-reset-btn/filter-reset-btn.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-filter',
  imports: [FilterResetBtnComponent, TranslatePipe, FormsModule],
  templateUrl: './price-filter.component.html'
})
export class PriceFilterComponent {

  priceFrom = signal<number | null>(null);
  priceTo = signal<number | null>(null);

  priceChange = output<{ from?: number; to?: number } | null>();

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