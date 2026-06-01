import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Occasion, OccasionsService } from '@elevate/core-data-access';
import { DashboardDataTableComponent } from '../../shared/components/dashboard-data-table/dashboard-data-table.component';
import { occasionsTableConfig } from './occasions-table.config';

@Component({
  selector: 'app-occasions',
  imports: [DashboardDataTableComponent],
  templateUrl: './occasions.component.html',
})
export class OccasionsComponent {
  private readonly occasionsService = inject(OccasionsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly config = occasionsTableConfig;
  readonly occasions = signal<Occasion[] | null>(null);

  constructor() {
    this.loadOccasions();
  }

  private loadOccasions(): void {
    this.occasionsService
      .getAllOccasions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((occasions) => this.occasions.set(occasions));
  }
}
