import { Component, DestroyRef, OnInit, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Occasion } from '../../../interfaces/product';
import { ProductsService } from '../../../services/product';
import { FilterResetBtnComponent } from '../filter-reset-btn/filter-reset-btn.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-occasion-filter',
  imports: [FilterResetBtnComponent, TranslatePipe],
  templateUrl: './occasion-filter.component.html',
})
export class OccasionFilterComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  occasions = signal<Occasion[]>([]);
  isLoading = signal(true);
  selectedOccasionIds = signal<Set<string>>(new Set());

  occasionChange = output<string[]>();

  ngOnInit(): void {
    this.fetchOccasions();
  }

  private fetchOccasions(): void {
    this.isLoading.set(true);
    this.productsService
      .getOccasions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.occasions.set(data.occasions);
          this.isLoading.set(false);
        }
      });
  }

  occasionImageUrl(image: string): string {
    return image.startsWith('http') ? image : `https://flower.elevateegy.com/uploads/${image}`;
  }

  onSelectOccasion(id: string): void {
    const current = new Set(this.selectedOccasionIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.selectedOccasionIds.set(current);
    this.occasionChange.emit([...current]);
  }

  onReset(emitChange = true): void {
    this.selectedOccasionIds.set(new Set());

    if (emitChange) {
      this.occasionChange.emit([]);
    }
  }
}