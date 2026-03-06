import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../shared/components/ui/product-card/interface/product';
import { ProductsService } from '../products/services/product.service';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { Review } from '../products/models/review.models';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { RelatedProductComponent } from './components/related-product/related-product.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product.details.html',
  styleUrls: ['./product.details.css'],
  imports: [
    ProductInfoComponent,
    ProductGalleryComponent,
    ProductReviewsComponent,
    RelatedProductComponent,
    TranslateModule,
  ],
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  productId = signal<string | null>(null);
  product = signal<Product | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.watchRouteParams();
  }

  private watchRouteParams(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.productId.set(id);
          this.loadProductDetails(id);
          this.loadProductReviews(id);
          this.loadRelatedProducts(id);
        } else {
          this.router.navigate(['/products']);
        }
      });
  }

  private loadProductDetails(id: string): void {
    this.isLoading.set(true);
    this.productService
      .getProductById(id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.product.set(res.product);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.router.navigate(['/products']);
        },
      });
  }
  reviews = signal<Review[]>([]);

  private loadProductReviews(id: string): void {
    this.productService
      .getProductReviews(id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.reviews.set(res.reviews);
        },
      });
  }
  relatedProducts = signal<Product[]>([]);

  private loadRelatedProducts(id: string): void {
    this.productService
      .getRelatedProductByID(id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.relatedProducts.set(res.relatedProducts);
          console.log(res.relatedProducts);
        },
      });
  }
  handleToggleWishlist(id: string) {
    //Implementaion wishlist
  }
  handleAddToCart(id: string) {
    //Implementation Add to cart
  }
}
