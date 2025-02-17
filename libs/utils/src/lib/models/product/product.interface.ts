import { Category } from '../../types/category/category.type';
import { Color } from '../../types/color/color.type';
import { FitType } from '../../types/fit-type/fit-type.type';
import { ProductType } from '../../types/product-type/product-type.type';
import { Size } from '../../types/size/size.type';

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  composition: string;
  price: number;
  inStock: boolean;
  category: Category;
  productType: ProductType;
  size: Size;
  fitType: FitType;
  color: Color;
  isNewArrival: boolean;
  isBestSelling: boolean;
  discountPercentage?: number;
  rating?: number;
}
