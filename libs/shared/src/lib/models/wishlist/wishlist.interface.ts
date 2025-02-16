export interface WishlistItem {
    id: string; // Unique identifier for each product
    name: string; // Name of the product
    price: number; // Price of the product
    imageUrl: string; // URL to the product image
    quantity: number; // Quantity of the product in the wishlist
    description?: string; // Optional description of the product
  }
  
//   export interface WishlistService {
//     // Get the list of items in the wishlist
//     getWishlist(): WishlistItem[];
  
//     // Add an item to the wishlist
//     addToWishlist(item: WishlistItem): void;
  
//     // Remove an item from the wishlist
//     removeFromWishlist(itemId: string): void;
  
//     // Check if an item is already in the wishlist
//     isItemInWishlist(itemId: string): boolean;
  
//     // Clear all items in the wishlist
//     clearWishlist(): void;
//   }