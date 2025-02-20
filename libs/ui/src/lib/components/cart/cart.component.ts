import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartSkeletonComponent } from '@faded-chapter/shared';
import { Product } from '@faded-chapter/utils';

@Component({
  selector: 'lib-cart',
  imports: [CommonModule, CartSkeletonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: { product: Product; size: string; quantity: number }[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Subscribe to cart updates
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice(); // Recalculate total when cart changes
    });
  }

  // Get stock available for a specific size
  getStockForSize(product: Product, size: string): number {
    return product.size.find(s => s.size === size)?.stock ?? 0;
  }

  // Update quantity with stock constraints
  updateQuantity(productId: string, size: string, newQuantity: number, product: Product) {
    const stockAvailable = this.getStockForSize(product, size);
    if (newQuantity < 1 || newQuantity > stockAvailable) return;

    this.cartService.updateQuantity(productId, size, newQuantity, product);
    this.calculateTotalPrice(); // Ensure total updates
  }

  // Remove item from cart
  removeFromCart(productId: string, size: string) {
    this.cartService.removeFromCart(productId, size);
    this.calculateTotalPrice(); // Ensure total updates
  }

  // Calculate total price
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    this.cdr.detectChanges(); // Force UI update
  }

  // Proceed to checkout (Placeholder for now)
  proceedToCheckout() {
    console.log('Proceeding to checkout with total:', this.totalPrice);
    // Implement actual checkout logic
  }
}
