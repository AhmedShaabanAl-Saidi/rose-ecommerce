import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { RevenueTrendPoint } from '../../../../core/interfaces/dashboard.interface';
import { LanguageService, Theme, ThemeService } from '@elevate/theme';

@Component({
  selector: 'app-revenue-chart',
  imports: [CommonModule, ChartModule, TranslatePipe],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.css',
})
export class RevenueChartComponent {
  private readonly translate = inject(TranslateService);
  private readonly languageService = inject(LanguageService);
  private readonly themeService = inject(ThemeService);

  dailyRevenue = input.required<RevenueTrendPoint[]>();
  monthlyRevenue = input.required<RevenueTrendPoint[]>();

  activeFilter = signal<'weekly' | 'monthly'>('weekly');

  setFilter(filter: 'weekly' | 'monthly') {
    this.activeFilter.set(filter);
  }

  activeData = computed(() => {
    return this.activeFilter() === 'weekly'
      ? this.dailyRevenue()
      : this.monthlyRevenue();
  });

  activeTotal = computed(() =>
    this.activeData().reduce((total, item) => total + item.revenue, 0)
  );

  chartData = computed(() => {
    this.languageService.currentLang();

    const data = this.activeData();

    return {
      labels: data.map(
        (d) =>
          d.date ||
          d._id ||
          this.translate.instant('DASHBOARD.OVERVIEW.WIDGETS.UNKNOWN')
      ),
      datasets: [
        {
          label: this.translate.instant('DASHBOARD.OVERVIEW.WIDGETS.REVENUE_LABEL'),
          data: data.map((d) => d.revenue),
          fill: true,
          borderColor: '#a6252a',
          backgroundColor: 'rgba(166, 37, 42, 0.12)',
          tension: 0.4,
          pointBackgroundColor: '#a6252a',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 6
        }
      ]
    };
  });

  chartOptions = computed(() => {
    const isDark = this.themeService.theme() === Theme.DARK;
    const tickColor = isDark ? '#a1a1aa' : '#a1a1aa';
    const gridColor = isDark ? '#27272a' : '#f4f4f5';

    return {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: isDark ? '#18181b' : '#ffffff',
          titleColor: isDark ? '#fafafa' : '#18181b',
          bodyColor: isDark ? '#e4e4e7' : '#3f3f46',
          borderColor: isDark ? '#3f3f46' : '#e4e4e7',
          borderWidth: 1
        },
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
            maxTicksLimit: 6,
            color: tickColor
          }
        },
        y: {
          border: {
            display: false
          },
          grid: {
            color: gridColor
          },
          ticks: {
            maxTicksLimit: 5,
            color: tickColor,
            callback: function(value: any) {
              if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
              if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
              return value;
            }
          }
        }
      },
      maintainAspectRatio: false,
      responsive: true,
      resizeDelay: 100
    };
  });
}
