import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { RevenueTrendPoint } from '../../../../core/interfaces/dashboard.interface';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.css',
})
export class RevenueChartComponent {
  dailyRevenue = input.required<RevenueTrendPoint[]>();
  monthlyRevenue = input.required<RevenueTrendPoint[]>();

  activeFilter = signal<'weekly' | 'monthly'>('weekly');

  setFilter(filter: 'weekly' | 'monthly') {
    this.activeFilter.set(filter);
  }

  activeData = computed(() => {
    return this.activeFilter() === 'weekly' ? this.dailyRevenue() : this.monthlyRevenue();
  });

  chartData = computed(() => {
    const data = this.activeData();
    
    return {
      labels: data.map(d => d.date || d._id || 'Unknown'),
      datasets: [
        {
          label: 'Revenue (EGP)',
          data: data.map(d => d.revenue),
          fill: true,
          borderColor: '#e11d48', // rose-600
          backgroundColor: 'rgba(225, 29, 72, 0.2)', // rose-600 with opacity
          tension: 0.4,
          pointBackgroundColor: '#e11d48',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
  });

  chartOptions = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#a1a1aa'
        }
      },
      y: {
        border: {
          display: false
        },
        grid: {
          color: '#f4f4f5'
        },
        ticks: {
          color: '#a1a1aa',
          callback: function(value: any) {
            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
            if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
            return value;
          }
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };
}
