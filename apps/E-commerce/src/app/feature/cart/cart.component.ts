import { Component, computed, inject } from '@angular/core';
import { CartService } from './services/cart.service';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ProductLikedComponent } from './components/product-liked/product-liked.component';

@Component({
  selector: 'app-cart',
  imports: [CartDetailsComponent, ProductLikedComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  cart = computed(() => this.cartService.cart());
  cartCount = computed(() => this.cartService.cartCount());
}
