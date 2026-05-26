import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { OrderStatusStat } from '../../../../core/interfaces/dashboard.interface';
import { LanguageService } from '@elevate/theme';

@Component({
  selector: 'app-order-status-chart',

  imports: [CommonModule, ChartModule, TranslatePipe],
  templateUrl: './order-status-chart.component.html',
  styleUrl: './order-status-chart.component.css',
})
export class OrderStatusChartComponent {
  private readonly translate = inject(TranslateService);
  private readonly languageService = inject(LanguageService);

  items = input.required<OrderStatusStat[]>();

  totalCount = computed(() => this.items().reduce((acc, curr) => acc + curr.count, 0));

  legendItems = computed(() => {
    this.languageService.currentLang();

    const data = this.items();
    const total = this.totalCount();
    const colorsMap: Record<string, string> = {
      Completed: '#10b981',
      'In progress': '#3b82f6',
      Pending: '#f59e0b',
      Canceled: '#ef4444',
    };

    return data.map(item => {
      let rawStatus = item.status || item._id || 'unknown';
      if (rawStatus === 'inProgress' || rawStatus === 'in progress') rawStatus = 'In progress';
      if (rawStatus === 'completed') rawStatus = 'Completed';
      if (rawStatus === 'pending') rawStatus = 'Pending';
      if (rawStatus === 'canceled') rawStatus = 'Canceled';
      
      const percentage = total === 0 ? 0 : Math.round((item.count / total) * 100);
      
      return {
        label: this.translateStatus(rawStatus),
        count: item.count,
        percentage,
        color: colorsMap[rawStatus as string] || '#a1a1aa'
      };
    });
  });

  chartData = computed(() => {
    const items = this.legendItems();
    return {
      labels: items.map(item => item.label),
      datasets: [
        {
          data: items.map(item => item.count),
          backgroundColor: items.map(item => item.color),
          hoverBackgroundColor: items.map(item => item.color),
          borderWidth: 0,
        },
      ],
    };
  });

  chartOptions = {
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '70%',
    maintainAspectRatio: false,
    responsive: true,
    resizeDelay: 100
  };

  private translateStatus(status: string): string {
    switch (status) {
      case 'Completed':
        return this.translate.instant('DASHBOARD.OVERVIEW.ORDER_STATUS.COMPLETED');
      case 'In progress':
        return this.translate.instant('DASHBOARD.OVERVIEW.ORDER_STATUS.IN_PROGRESS');
      case 'Pending':
        return this.translate.instant('DASHBOARD.OVERVIEW.ORDER_STATUS.PENDING');
      case 'Canceled':
        return this.translate.instant('DASHBOARD.OVERVIEW.ORDER_STATUS.CANCELED');
      default:
        return this.translate.instant('DASHBOARD.OVERVIEW.ORDER_STATUS.UNKNOWN');
    }
  }
}
