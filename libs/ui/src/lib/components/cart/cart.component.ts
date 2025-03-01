import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem, CartService, CartSkeletonComponent } from '@faded-chapter/shared';
import { SuggestedProductsComponent } from '../product-list/suggested-products/suggested-products.component';
import { Router } from '@angular/router';
import { Product } from '@faded-chapter/utils';

@Component({
  selector: 'lib-cart',
  imports: [CommonModule, CartSkeletonComponent, SuggestedProductsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Use CartItem interface
  totalPrice = 0;
  currentProductId = '';
  appliedDiscount = true;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  getStockForSize(product: Product, size: string): number {
    return product.size.find((s) => s.size === size)?.stock ?? 0;
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get estimatedTax(): number {
    return this.totalPrice * 0.08;
  }

  get discountAmount(): number {
    return this.appliedDiscount ? this.totalPrice * 0.1 : 0;
  }

  updateQuantity(
    productId: string,
    size: string,
    newQuantity: number,
    product: Product
  ) {
    const stockAvailable = this.getStockForSize(product, size);
    if (newQuantity < 1 || newQuantity > stockAvailable) return;
    this.cartService.updateQuantity(productId, size, newQuantity, product);
    this.calculateTotalPrice();
  }

  removeFromCart(productId: string, size: string) {
    this.cartService.removeFromCart(productId, size);
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    this.cdr.detectChanges();
  }

  proceedToCheckout() {
    console.log('Proceeding to checkout with total:', this.totalPrice);
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }

  trackById(index: number, item: CartItem): string {
    return item.product.id + item.size;
  }
}
