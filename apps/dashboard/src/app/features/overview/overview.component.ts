import { Component, DestroyRef, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { ListWidgetComponent, ListItem } from './components/list-widget/list-widget.component';
import { OrderStatusChartComponent } from './components/order-status-chart/order-status-chart.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { TopSellingProductsComponent } from './components/top-selling-products/top-selling-products.component';
import { LowStockProductsComponent } from './components/low-stock-products/low-stock-products.component';

@Component({
  selector: 'app-overview',
  imports: [
    CommonModule,
    StatCardComponent,
    ListWidgetComponent,
    OrderStatusChartComponent,
    RevenueChartComponent,
    TopSellingProductsComponent,
    LowStockProductsComponent,
    TranslatePipe,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  // Expose signals to the view
  readonly statistics = this.dashboardService.statistics;
  readonly loading = this.dashboardService.loading;
  readonly error = this.dashboardService.error;

  readonly categoryWidgetItems = computed<ListItem[]>(() => {
    const stats = this.statistics();
    if (!stats) return [];
    return stats.products.productsByCategory.map((c) => ({
      label: c.category,
      value: c.count
    }));
  });

  ngOnInit() {
    this.setSEO();
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.setSEO());
    this.loadData();
  }

  loadData() {
    this.dashboardService.loadAllStatistics().subscribe();
  }

  refreshData() {
    this.loadData();
  }

  private setSEO() {
    this.titleService.setTitle(
      this.translate.instant('DASHBOARD.OVERVIEW.SEO_TITLE')
    );
    this.metaService.updateTag({
      name: 'description',
      content: this.translate.instant('DASHBOARD.OVERVIEW.SEO_DESCRIPTION'),
    });
  }
}
