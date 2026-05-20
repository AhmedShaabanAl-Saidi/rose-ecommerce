import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProductStat } from '../../../../core/interfaces/dashboard.interface';

interface DisplayLowStockProduct {
  _id: string;
  name: string;
  stock: number;
  image: string;
}

@Component({
  selector: 'app-low-stock-products',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule],
  templateUrl: './low-stock-products.component.html',
  styleUrl: './low-stock-products.component.css',
})
export class LowStockProductsComponent {
  items = input.required<ProductStat[]>();
  readonly threshold = 10;

  productsList = computed<DisplayLowStockProduct[]>(() => {
    return this.items().map((p) => {
      const stockVal = p.stock !== undefined ? p.stock : (p.quantity !== undefined ? p.quantity : 0);
      return {
        _id: p._id,
        name: p.name || p.title || 'Unknown',
        stock: stockVal,
        image: p.image || p.imgCover || 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=300&auto=format&fit=crop',
      };
    });
  });

  isCritical(stock: number): boolean {
    return stock < this.threshold;
  }

  getSeverity(stock: number): 'success' | 'warn' | 'danger' | 'info' | 'secondary' | 'contrast' {
    if (stock === 0) return 'danger';
    if (stock < this.threshold) return 'warn';
    return 'success';
  }

  getStatusText(stock: number): string {
    if (stock === 0) return 'Out of Stock';
    if (stock < this.threshold) return 'Low Stock';
    return 'Optimal';
  }

  fallbackImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=300&auto=format&fit=crop';
  }
}
