import { Category } from '../../types/category/category.type';
import { Color } from '../../types/color/color.type';
import { FitType } from '../../types/fit-type/fit-type.type';
import { ProductType } from '../../types/product-type/product-type.type';
import { Size } from '../../types/size/size.type';

export interface Product {
  id: string;
  name: string;
  image: string;
  productGallery?: string[];
  description: string;
  composition: string;
  price: number;
  inStock: boolean;
  category: Category;
  productType: ProductType;
  size: { size: Size; stock: number; available: boolean }[];
  fitType: FitType;
  color: Color;
  isNewArrival?: boolean;
  isBestSelling?: boolean;
  isFeatured?: boolean;
  isCollaboration?:boolean;
  discountPercentage?: number;
  rating?: number;
  slug: string;
}