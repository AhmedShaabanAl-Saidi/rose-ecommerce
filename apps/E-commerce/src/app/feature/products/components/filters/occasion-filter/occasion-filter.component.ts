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
  selectedOccasionId = signal<string | null>(null);

  occasionChange = output<string | null>();

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
    const newId = this.selectedOccasionId() === id ? null : id;
    this.selectedOccasionId.set(newId);
    this.occasionChange.emit(newId);
  }

  onReset(): void {
    this.selectedOccasionId.set(null);
    this.occasionChange.emit(null);
  }
}
