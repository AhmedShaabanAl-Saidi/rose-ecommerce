import { Component, computed, inject } from '@angular/core';
import { CartService } from './services/cart.service';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

@Component({
  selector: 'app-cart',
  imports: [CartDetailsComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  cart = computed(() => this.cartService.cart());
  cartCount = computed(() => this.cartService.cartCount());
}
