import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCardComponent } from '../../../../shared/components/ui/product-card/product-card.component';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ProductCardComponent],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.css',
})
export class BestSellerComponent {
  bestSellers = input.required<Product[]>();

  categories = signal<string[]>([
    'HOME.BEST_SELLER.CATEGORIES.WEDDING',
    'HOME.BEST_SELLER.CATEGORIES.ANNIVERSARY',
    'HOME.BEST_SELLER.CATEGORIES.BIRTHDAY',
    'HOME.BEST_SELLER.CATEGORIES.ENGAGEMENT',
  ]);

  activeCategory = signal<number>(1);

  displayedProducts = computed(() => this.bestSellers());

  selectCategory(index: number): void {
    this.activeCategory.set(index);
  }
}
