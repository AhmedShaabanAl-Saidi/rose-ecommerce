import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProductStat } from '../../../../core/interfaces/dashboard.interface';
import { LanguageService } from '@elevate/theme';

interface DisplayLowStockProduct {
  _id: string;
  name: string;
  stock: number;
  image: string;
}

@Component({
  selector: 'app-low-stock-products',
  imports: [CommonModule, TableModule, TagModule, TranslatePipe],
  templateUrl: './low-stock-products.component.html',
  styleUrl: './low-stock-products.component.css',
})
export class LowStockProductsComponent {
  private readonly translate = inject(TranslateService);
  private readonly languageService = inject(LanguageService);

  items = input.required<ProductStat[]>();
  readonly threshold = 10;

  productsList = computed<DisplayLowStockProduct[]>(() => {
    this.languageService.currentLang();

    return this.items().map((p) => {
      const stockVal = p.stock !== undefined ? p.stock : (p.quantity !== undefined ? p.quantity : 0);
      return {
        _id: p._id,
        name:
          p.name ||
          p.title ||
          this.translate.instant('DASHBOARD.OVERVIEW.WIDGETS.UNKNOWN'),
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
    if (stock === 0) {
      return this.translate.instant(
        'DASHBOARD.OVERVIEW.INVENTORY_STATUS.OUT_OF_STOCK'
      );
    }
    if (stock < this.threshold) {
      return this.translate.instant(
        'DASHBOARD.OVERVIEW.INVENTORY_STATUS.LOW_STOCK'
      );
    }
    return this.translate.instant('DASHBOARD.OVERVIEW.INVENTORY_STATUS.OPTIMAL');
  }

  getStockWidth(stock: number): number {
    return Math.min(Math.max((stock / this.threshold) * 100, 0), 100);
  }

  getStockClasses(stock: number): string {
    if (stock === 0) {
      return 'stock-meter__fill--danger';
    }
    if (stock < this.threshold) {
      return 'stock-meter__fill--warning';
    }
    return 'stock-meter__fill--success';
  }

  getStatusClasses(stock: number): string {
    if (stock === 0) {
      return 'inventory-status--danger';
    }
    if (stock < this.threshold) {
      return 'inventory-status--warning';
    }
    return 'inventory-status--success';
  }

  fallbackImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=300&auto=format&fit=crop';
  }
}
