import { Component, computed, inject } from '@angular/core';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CopounComponent } from './components/copoun/copoun.component';
import { ProductLikedComponent } from './components/product-liked/product-liked.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CartDetailsComponent, ProductLikedComponent, CopounComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  cart = computed(() => this.cartService.cart());
  cartCount = computed(() => this.cartService.cartCount());
}
