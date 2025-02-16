import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistItem, WishlistService } from '@faded-chapter/shared';

@Component({
  selector: 'lib-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItem[] = []; // Explicitly type the wishlist

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlist = this.wishlistService.getWishlist();
  }

  removeFromWishlist(itemId: string): void { // Correct the type of itemId to string
    this.wishlistService.removeFromWishlist(itemId);
    this.wishlist = this.wishlistService.getWishlist(); // Update the displayed wishlist
  }
}