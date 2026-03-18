import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '@elevate/reusable-ui';
import { WishlistService } from '../../shared/services/wishlist.service';
import { ProductCardComponent } from '../../shared/components/ui/product-card/product-card.component';
import { ProductsService } from '../products/services/product';
import { HeadingTitleComponent } from '../../shared/components/ui/heading/heading-title.component';
import { ProdcutCarousalComponent } from '../../shared/components/ui/product-carousal/prodcut-carousal.component';
import { Product } from '../../shared/components/ui/product-card/interface/product';

@Component({
  selector: 'app-wishlist',
  imports: [TranslateModule, LucideAngularModule, ButtonComponent, ProductCardComponent, HeadingTitleComponent, ProdcutCarousalComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  readonly wishlistService = inject(WishlistService);
  private readonly router = inject(Router);
  readonly productsService = inject(ProductsService);

  recommendedProducts = signal<Product[]>([]);

  ngOnInit(): void {
    this.wishlistService.loadWishlist();
    this.loadRecommendedProducts();
  }

  loadRecommendedProducts(): void {
    this.productsService.getProducts({ limit: 8 }).subscribe({
      next: (res) => {
        this.recommendedProducts.set(res.products);
      }
    });
  }

  browseProducts(): void {
    this.router.navigate(['/products']);
  }
}
