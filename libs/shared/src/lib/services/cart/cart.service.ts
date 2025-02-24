import { Injectable } from '@angular/core';
import { CookieHandlerService, Product } from '@faded-chapter/utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<{ product: Product; size: string; quantity: number }[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private itemCountSubject = new BehaviorSubject<number>(0); // Add item count subject
  itemCount$ = this.itemCountSubject.asObservable(); // Add item count observable

  private cartCookieName = 'cartItems';

  constructor(private cookieService: CookieHandlerService) {
    this.loadCartFromCookie();
    this.updateItemCount(); // Initial update
  }

  addToCart(product: Product, size: string, quantity: number) {
    const currentCart = this.cartItems.getValue();
    const selectedSize = product.size.find((s) => s.size === size);

    if (!selectedSize || !selectedSize.available) return;

    const existingItem = currentCart.find(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + quantity, selectedSize.stock);
    } else {
      currentCart.push({ product, size, quantity: Math.min(quantity, selectedSize.stock) });
    }

    this.cartItems.next([...currentCart]);
    this.saveCartToCookie();
    this.updateItemCount(); // Update item count
  }

  removeFromCart(productId: string, size: string) {
    const updatedCart = this.cartItems.getValue().filter(
      (item) => !(item.product.id === productId && item.size === size)
    );

    this.cartItems.next(updatedCart);
    this.saveCartToCookie();
    this.updateItemCount(); // Update item count
  }

  updateQuantity(productId: string, size: string, quantity: number, product: Product) {
    const currentCart = this.cartItems.getValue();
    const item = currentCart.find(
      (cartItem) => cartItem.product.id === productId && cartItem.size === size
    );

    if (item) {
      const selectedSize = product.size.find((s) => s.size === size);
      if (!selectedSize) return;

      item.quantity = Math.min(Math.max(1, quantity), selectedSize.stock);
      this.cartItems.next([...currentCart]);
      this.saveCartToCookie();
      this.updateItemCount(); // Update item count
    }
  }

  getCartItems() {
    return this.cartItems.getValue();
  }

  private loadCartFromCookie(): void {
    const cartCookie = this.cookieService.getCookie(this.cartCookieName);
    if (cartCookie) {
      try {
        this.cartItems.next(JSON.parse(cartCookie));
      } catch (error) {
        console.error('Error parsing cart cookie:', error);
        this.cartItems.next([]);
      }
    }
    this.updateItemCount(); // Update count after cookie load
  }

  private saveCartToCookie(): void {
    const cartJson = JSON.stringify(this.cartItems.getValue());
    this.cookieService.setCookie(this.cartCookieName, cartJson, 7);
  }

  private updateItemCount(): void {
    const totalItems = this.cartItems.getValue().reduce((total, item) => total + item.quantity, 0);
    this.itemCountSubject.next(totalItems);
  }
}