import { Product } from "../product/product.interface";

export interface FilterOptions {
    category?: Product['category'][];
    productType?: Product['productType'][];
    size?: Product['size'][];
    fitType?: Product['fitType'][];
    color?: Product['color'][];
    inStock?: boolean;
    priceRange?: { min: number; max: number };
    rating?: number;
    discountOnly?: boolean;
  }