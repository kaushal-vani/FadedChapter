import { Injectable } from '@angular/core';
import { Product } from '@faded-chapter/utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<{ product: Product; size: string; quantity: number }[]>([]);
  cartItems$ = this.cartItems.asObservable(); // Expose as observable for real-time updates

  // Add to cart ensuring stock limits
  addToCart(product: Product, size: string, quantity: number) {
    const currentCart = this.cartItems.getValue();
    const selectedSize = product.size.find(s => s.size === size);

    if (!selectedSize || !selectedSize.available) return; // Prevent adding unavailable sizes

    const existingItem = currentCart.find(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + quantity, selectedSize.stock);
    } else {
      currentCart.push({ product, size, quantity: Math.min(quantity, selectedSize.stock) });
    }

    this.cartItems.next([...currentCart]); // Update cart
  }

  // Remove item from cart
  removeFromCart(productId: string, size: string) {
    const updatedCart = this.cartItems.getValue().filter(
      (item) => !(item.product.id === productId && item.size === size)
    );

    this.cartItems.next(updatedCart); // Update cart
  }

  // Update quantity within stock constraints
  updateQuantity(productId: string, size: string, quantity: number, product: Product) {
    const currentCart = this.cartItems.getValue();
    const item = currentCart.find(
      (cartItem) => cartItem.product.id === productId && cartItem.size === size
    );

    if (item) {
      const selectedSize = product.size.find(s => s.size === size);
      if (!selectedSize) return; // If size doesn't exist, do nothing

      item.quantity = Math.min(Math.max(1, quantity), selectedSize.stock); // Ensure within stock limits
      this.cartItems.next([...currentCart]);
    }
  }

  // Retrieve cart items (for non-reactive usage)
  getCartItems() {
    return this.cartItems.getValue();
  }
}
