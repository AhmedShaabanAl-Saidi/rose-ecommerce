import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutGrid, LucideAngularModule } from 'lucide-angular';
import { finalize } from 'rxjs';
import { TaxonomyCardComponent } from '../../shared/components/ui/taxonomy-card/taxonomy-card.component';
import { Occasion, OccasionsService } from '@elevate/core-data-access';

@Component({
  selector: 'app-occasions',
  imports: [TranslateModule, LucideAngularModule, TaxonomyCardComponent],
  templateUrl: './occasions.component.html',
})
export class OccasionsComponent {
  private readonly occasionsService = inject(OccasionsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly occasions = signal<Occasion[]>([]);
  readonly isLoading = signal(true);
  readonly skeletonCards = [1, 2, 3, 4, 5, 6, 7, 8];
  readonly LayoutGridIcon = LayoutGrid;

  constructor() {
    this.loadOccasions();
  }

  occasionImageUrl(image: string): string {
    return image.startsWith('http')
      ? image
      : `https://flower.elevateegy.com/uploads/${image}`;
  }

  private loadOccasions(): void {
    this.isLoading.set(true);

    this.occasionsService
      .getOccasions()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res) => {
          const sortedOccasions = [...res.occasions].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          this.occasions.set(sortedOccasions);
        },
      });
  }
}
