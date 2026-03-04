import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/product.service';
import { ProductCardComponent } from '../../../../../../shared/components/ui/product-card/product-card.component';
import { Product } from '../../../../../../shared/components/ui/product-card/interface/product';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  template: '',
  styleUrls: ['./product.details.css'],
  imports: [
    ProductCardComponent,
    DecimalPipe,
    CommonModule,
    LucideAngularModule,
  ],
})
export class ProductDetailsComponent implements OnInit {
  reviews = [
    {
      author: 'Adrian',
      initial: 'A',
      date: 'Apr 7, 2025',
      rating: 4,
      title: 'Awesome Bouquet!',
      comment:
        'I ordered this bouquet for a special occasion, and it absolutely exceeded my expectations! The flowers were fresh, beautifully arranged.',
    },
    {
      author: 'Karim',
      initial: 'K',
      date: 'May 10, 2025',
      rating: 5,
      title: 'Excellent Service',
      comment:
        'Delivery was right on time and the bouquet arrived in perfect condition. Will definitely order again!',
    },
  ];

  productId: string | null = null;
  ProductById: Product | null = null;
  relatedProducts: Product[] = [];
  mainImage: string = '';
  localIsInWishlist: boolean = false;
  isLoading: boolean = true;

  private readonly activatedRouter = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductsService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly crd = inject(DestroyRef);

  getproductId(): void {
    this.activatedRouter.paramMap.pipe(takeUntilDestroyed(this.crd)).subscribe({
      next: (urlData) => {
        const id = urlData.get('id');
        if (id) {
          this.productId = id;
          this.getProductById(id);
        } else {
          this.router.navigate(['/products']);
        }
      },
    });
  }

  getProductById(id: string): void {
    this.isLoading = true;

    this.productService
      .getProductById(id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.ProductById = res.product;
          this.mainImage = res.product.imgCover ?? '';
          this.localIsInWishlist = res.product.isInWishlist ?? false;
          this.getRelatedProducts(res.product.category);

          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }, 0);
        },
        error: () => {
          this.isLoading = false;
          this.router.navigate(['/products']);
        },
      });
  }

  getRelatedProducts(categoryId: string): void {
    this.productService
      .getProducts(1, categoryId)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.relatedProducts = res.products
            .filter((p: Product) => p._id !== this.ProductById?._id)
            .slice(0, 4);
        },
      });
  }

  getFullStars(rate: number = 0): number[] {
    return Array(Math.floor(rate ?? 0)).fill(0);
  }

  getEmptyStars(rate: number = 0): number[] {
    return Array(5 - Math.floor(rate ?? 0)).fill(0);
  }

  changeImage(image: string): void {
    this.mainImage = image;
  }

  addToWishList(): void {
    if (!this.productId) return;
    this.localIsInWishlist = !this.localIsInWishlist;

    this.productService.addToWishlist(this.productId).subscribe({
      next: () => {},
      error: (err) => {
        this.localIsInWishlist = !this.localIsInWishlist;
        console.error('Failed to update wishlist:', err);
      },
    });
  }

  addToCart(): void {
    if (!this.ProductById || this.ProductById.quantity <= 0) return;
    console.log('Add to cart:', this.ProductById._id);
  }

  ngOnInit(): void {
    this.getproductId();
  }
}
