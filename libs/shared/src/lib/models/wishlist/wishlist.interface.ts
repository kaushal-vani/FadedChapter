export interface WishlistItem {
  id: string; // Product ID (from MongoDB)
  name: string;
  image: string;
  price: number;
  inStock: boolean;
}

export interface Wishlist {
  userId: string;
  items: WishlistItem[];
}
