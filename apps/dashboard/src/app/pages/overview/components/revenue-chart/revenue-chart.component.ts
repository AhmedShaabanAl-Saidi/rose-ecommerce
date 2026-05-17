import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueTrendPoint } from '../../../../core/interfaces/dashboard.interface';

interface ChartPoint {
  label: string;
  value: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.css',
})
export class RevenueChartComponent {
  dailyRevenue = input.required<RevenueTrendPoint[]>();
  monthlyRevenue = input.required<RevenueTrendPoint[]>();

  activeFilter = signal<'weekly' | 'monthly'>('weekly');
  hoverPoint = signal<ChartPoint | null>(null);

  setFilter(filter: 'weekly' | 'monthly') {
    this.activeFilter.set(filter);
    this.hoverPoint.set(null);
  }

  // Dimensions of graph canvas
  readonly width = 500;
  readonly height = 220;
  readonly paddingLeft = 45;
  readonly paddingRight = 10;
  readonly paddingTop = 20;
  readonly paddingBottom = 40;

  readonly chartWidth = this.width - this.paddingLeft - this.paddingRight;
  readonly chartHeight = this.height - this.paddingTop - this.paddingBottom;

  // Active dataset
  activeData = computed(() => {
    return this.activeFilter() === 'weekly' ? this.dailyRevenue() : this.monthlyRevenue();
  });

  // Calculate points
  points = computed<ChartPoint[]>(() => {
    const data = this.activeData();
    if (data.length === 0) return [];

    const maxVal = Math.max(...data.map((d) => d.revenue), 1000);
    const steps = data.length - 1;

    return data.map((d, i) => {
      const x = this.paddingLeft + (i / steps) * this.chartWidth;
      const y = this.paddingTop + this.chartHeight - (d.revenue / maxVal) * this.chartHeight;

      return {
        label: d.date || d._id || 'Unknown',
        value: d.revenue,
        x,
        y,
      };
    });
  });

  // Main line SVG path
  linePath = computed(() => {
    const pts = this.points();
    if (pts.length === 0) return '';
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  });

  // Area gradient SVG path
  areaPath = computed(() => {
    const pts = this.points();
    if (pts.length === 0) return '';
    const first = pts[0];
    const last = pts[pts.length - 1];
    const bottomY = this.paddingTop + this.chartHeight;

    const lineSegs = pts.map((p) => `L ${p.x} ${p.y}`).join(' ');
    return `M ${first.x} ${bottomY} ${lineSegs} L ${last.x} ${bottomY} Z`;
  });

  // Grid lines
  gridLines = computed(() => {
    const lines = [];
    const step = this.chartHeight / 4;
    for (let i = 0; i <= 4; i++) {
      lines.push(this.paddingTop + i * step);
    }
    return lines;
  });

  // Y Axis labels
  yAxisLabels = computed(() => {
    const data = this.activeData();
    if (data.length === 0) return [];
    const maxVal = Math.max(...data.map((d) => d.revenue), 1000);
    const labels = [];
    for (let i = 0; i <= 4; i++) {
      const value = maxVal - (i / 4) * maxVal;
      const y = this.paddingTop + (i / 4) * this.chartHeight;
      labels.push({ value, y });
    }
    return labels;
  });

  formatCurrencyShort(val: number): string {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(0) + 'k';
    return val.toString();
  }

  formatCurrencyFull(val: number): string {
    return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(val);
  }

  // Adjust tooltip centering based on container size scaling
  getTooltipLeft(svgX: number): number {
    return (svgX / this.width) * 100;
  }
}
