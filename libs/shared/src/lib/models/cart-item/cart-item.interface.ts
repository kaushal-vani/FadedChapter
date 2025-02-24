import { Product } from "@faded-chapter/utils";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}