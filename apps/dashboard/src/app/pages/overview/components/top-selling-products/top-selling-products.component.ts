import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStat } from '../../../../core/interfaces/dashboard.interface';

interface DisplayProduct {
  _id: string;
  nameWithPrice: string;
  sales: number;
  salesFormatted: string;
  percentageWidth: number;
  image: string;
}

@Component({
  selector: 'app-top-selling-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-selling-products.component.html',
  styleUrl: './top-selling-products.component.css',
})
export class TopSellingProductsComponent {
  items = input.required<ProductStat[]>();

  maxSales = computed(() => {
    const list = this.items();
    if (list.length === 0) return 1;
    return Math.max(...list.map((p) => p.sales || p.sold || 0), 1);
  });

  productsList = computed<DisplayProduct[]>(() => {
    return this.items().map((p) => {
      const priceFormatted = new Intl.NumberFormat('en-EG', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0,
      }).format(p.price);

      const name = p.name || p.title || 'Unknown';
      const sales = p.sales || p.sold || 0;
      const image = p.image || p.imgCover || 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=300&auto=format&fit=crop';

      return {
        _id: p._id,
        nameWithPrice: `${name} (${priceFormatted})`,
        sales,
        salesFormatted: new Intl.NumberFormat('en-US').format(sales),
        percentageWidth: (sales / this.maxSales()) * 100,
        image,
      };
    });
  });

  fallbackImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=300&auto=format&fit=crop';
  }
}
