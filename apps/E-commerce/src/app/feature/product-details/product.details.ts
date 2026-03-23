import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Product } from '../../shared/components/ui/product-card/interface/product';
import { Review } from '../products/interfaces/review';
import { ProductsService } from '../products/services/product';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product.details.html',
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
  private readonly cartService = inject(CartService);
  private readonly destroyRef = inject(DestroyRef);

  product = signal<Product | null>(null);
  reviews = signal<Review[]>([]);
  relatedProducts = signal<Product[]>([]);

  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.initDataStream();
  }

  private initDataStream(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((params) => params.get('id')),
        tap((id) => {
          if (!id || !this.isValidMongoId(id)) {
            this.handleInvalidProductId();
          }
          this.isLoading.set(true);
        }),
        filter((id): id is string => !!id && this.isValidMongoId(id)),
        switchMap((id) =>
          forkJoin({
            product: this.productService.getProductById(id).pipe(
              catchError(() => {
                this.handleInvalidProductId();
                return EMPTY;
              })
            ),
            reviews: this.productService
              .getProductReviews(id)
              .pipe(catchError(() => of({ reviews: [] }))),
            related: this.productService
              .getRelatedProductByID(id)
              .pipe(catchError(() => of({ relatedProducts: [] }))),
          }).pipe(finalize(() => this.isLoading.set(false)))
        )
      )
      .subscribe((data) => {
        this.product.set(data.product.product);
        this.reviews.set(data.reviews.reviews || []);
        this.relatedProducts.set(data.related.relatedProducts || []);
      });
  }

  private isValidMongoId(id: string): boolean {
    return /^[a-f\d]{24}$/i.test(id);
  }

  private handleInvalidProductId(): void {
    this.router.navigate(['/not-found']);
  }

  handleAddToCart(id: string): void {
    this.cartService.addToCart(id).pipe(take(1)).subscribe();
  }

  handleToggleWishlist(id: string): void {
    //Implement Add to wishlist
  }
}
