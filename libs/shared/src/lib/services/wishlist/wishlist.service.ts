import { Injectable } from '@angular/core';
import { WishlistItem } from '../../models/wishlist/wishlist.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: WishlistItem[] = [];

  constructor() {
    // Load wishlist from localStorage or backend (if user is logged in)
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlist = JSON.parse(savedWishlist);
    }
  }

  // Get the current wishlist
  getWishlist(): WishlistItem[] {
    return this.wishlist;
  }

  // Add an item to the wishlist
  addToWishlist(item: WishlistItem): void {
    // Check if item already exists in the wishlist
    if (!this.wishlist.some((i) => i.id === item.id)) {
      this.wishlist.push(item);
      this.updateWishlistStorage();
    }
  }

  // Remove an item from the wishlist
  removeFromWishlist(itemId: string): void {  // Corrected to match the WishlistItem id type
    this.wishlist = this.wishlist.filter((item) => item.id !== itemId);
    this.updateWishlistStorage();
  }

  // Update wishlist in localStorage
  private updateWishlistStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
}