import { Category } from "../../types/category/category.type";
import { Color } from "../../types/color/color.type";
import { FitType } from "../../types/fit-type/fit-type.type";
import { ProductType } from "../../types/product-type/product-type.type";
import { Size } from "../../types/size/size.type";

export interface FilterOptions {
  category?: Category[];
  productType?: ProductType[];
  size?: Size[];
  fitType?: FitType[];
  color?: Color[];
  inStock?: boolean;
  priceRange?: { min: number; max: number };
  rating?: number;
  discountOnly?: boolean;
  [key: string]: string[] | boolean | { min: number; max: number } | number | undefined;
}