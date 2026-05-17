import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusStat } from '../../../../core/interfaces/dashboard.interface';

interface DonutSlice {
  status: string;
  count: number;
  percentage: number;
  strokeDashArray: string;
  strokeDashOffset: number;
  color: string;
  badgeClass: string;
  textClass: string;
}

@Component({
  selector: 'app-order-status-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-status-chart.component.html',
  styleUrl: './order-status-chart.component.css',
})
export class OrderStatusChartComponent {
  items = input.required<OrderStatusStat[]>();

  totalOrders = computed(() => {
    return this.items().reduce((sum, item) => sum + item.count, 0);
  });

  slices = computed<DonutSlice[]>(() => {
    let currentOffset = 0;
    const colorsMap: Record<string, string> = {
      Completed: '#10b981', // Green
      'In progress': '#3b82f6', // Blue
      Pending: '#f59e0b', // Amber
      Canceled: '#ef4444', // Red
    };

    return this.items().map((item) => {
      const percentage = this.totalOrders() > 0 ? Math.round((item.count / this.totalOrders()) * 100) : 0;
      const strokeDashArray = `${percentage} ${100 - percentage}`;
      const strokeDashOffset = currentOffset;
      currentOffset -= percentage;

      const rawStatus = item.status || item._id || 'unknown';
      let statusName = rawStatus;
      if (rawStatus === 'inProgress' || rawStatus === 'in progress') {
        statusName = 'In progress';
      } else if (rawStatus === 'completed') {
        statusName = 'Completed';
      } else if (rawStatus === 'pending') {
        statusName = 'Pending';
      } else if (rawStatus === 'canceled') {
        statusName = 'Canceled';
      }

      const color = colorsMap[statusName] || '#a1a1aa';

      return {
        status: statusName,
        count: item.count,
        percentage,
        strokeDashArray,
        strokeDashOffset,
        color,
        badgeClass: statusName === 'Completed' ? 'bg-emerald-50 text-emerald-600' : statusName === 'In progress' ? 'bg-blue-50 text-blue-600' : statusName === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600',
        textClass: statusName === 'Completed' ? 'text-emerald-500' : statusName === 'In progress' ? 'text-blue-500' : statusName === 'Pending' ? 'text-amber-500' : 'text-red-500',
      };
    });
  });
}
