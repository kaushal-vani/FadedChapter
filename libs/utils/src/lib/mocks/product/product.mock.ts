import { Product } from "../../models/product/product.interface";

export const ProductMock: Product[] = [
  {
    id: '1',
    name: 'Vintage Angel Tee',
    image: 'products/angel.jpg',
    description: 'A classic black tee with a vintage angel graphic. Soft and comfortable.',
    composition: '100% Cotton',
    price: 29.99,
    inStock: true,
    category: 'Men',
    productType: 'T-Shirt', // Changed to T-Shirt for consistency
    size: ['S', 'M', 'L', 'XL'], // Added more sizes
    fitType: 'Regular',
    color: 'Black',
    isNewArrival: true,
    isBestSelling: false,
    isFeatured: true,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Relaxed Cupid Hoodie',
    image: 'products/hoodie.jpg',
    description: 'A warm and cozy white hoodie featuring a subtle Cupid design.',
    composition: '80% Cotton, 20% Polyester',
    price: 49.99,
    inStock: true,
    category: 'Unisex',
    productType: 'Hoodie',
    size: ['S', 'M', 'L', 'XL', 'XXL'], // Added more sizes
    fitType: 'Relaxed',
    color: 'White',
    isNewArrival: false,
    isBestSelling: true,
    isFeatured: false,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Trex White Tee', // More descriptive name
    image: 'products/trex.jpg',
    description: 'A trendy boxy white tee made with organic cotton.',
    composition: '100% Organic Cotton',
    price: 34.99,
    inStock: false,
    category: 'Women',
    productType: 'T-Shirt', // Changed to T-Shirt
    size: ['XS', 'S', 'M', 'L'], // Added more sizes
    fitType: 'Boxy',
    color: 'White',
    isNewArrival: false,
    isBestSelling: false,
    isFeatured: false,
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Light Blue Denim Shirt', // More descriptive name
    image: 'products/cupid.jpg',
    description: 'A stylish light blue denim shirt perfect for casual outings.',
    composition: '100% Denim Cotton',
    price: 59.99,
    inStock: true,
    category: 'Men',
    productType: 'Shirt',
    size: ['S', 'M', 'L', 'XL', 'XXL'], // Added more sizes
    fitType: 'Regular',
    color: 'Blue',
    isNewArrival: true,
    isBestSelling: true,
    isFeatured: false,
    rating: 4.9,
  },
  {
    id: '5',
    name: 'Oversized Metro Graphic Tee',  // More descriptive name
    image: 'products/metro.jpg',
    description: 'An oversized black tee with a bold metro graphic print.',
    composition: '100% Cotton',
    price: 39.99,
    inStock: true,
    category: 'Unisex',
    productType: 'T-Shirt',  // Changed to T-Shirt
    size: ['S', 'M', 'L', 'XL'], // Added more sizes
    fitType: 'Boxy',
    color: 'Black',
    isNewArrival: false,
    isBestSelling: true,
    isFeatured: false,
    rating: 4.7,
  },
  {
    id: '6',
    name: 'Classic Black Polo', // More descriptive name
    image: 'products/polo.jpg',
    description: 'A classic black polo shirt, perfect for a smart casual look.',
    composition: '100% Cotton',
    price: 29.99,
    inStock: true,
    category: 'Men',
    productType: 'Polo', // Changed to Polo Shirt
    size: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'], // Added more sizes
    fitType: 'Regular',
    color: 'Black',
    isNewArrival: true,
    isBestSelling: false,
    isFeatured: false,
    rating: 4.5,
  },
  {
    id: '7',
    name: 'Red Relaxed Hoodie', // More descriptive name
    image: 'products/front.jpg',
    description: 'A warm and cozy red hoodie, ideal for everyday wear.',
    composition: '80% Cotton, 20% Polyester',
    price: 49.99,
    inStock: true,
    category: 'Unisex',
    productType: 'Hoodie',
    size: ['S', 'M', 'L', 'XL'], // Added more sizes
    fitType: 'Relaxed',
    color: 'Red',
    isNewArrival: false,
    isBestSelling: false,
    isFeatured: true,
    rating: 4.8,
  },
  {
    id: '8',
    name: 'Organic Cotton White Tee', // More descriptive name
    image: 'products/olive.jpg',
    description: 'A trendy boxy white tee made with organic cotton. Super soft.',
    composition: '100% Organic Cotton',
    price: 34.99,
    inStock: false,
    category: 'Women',
    productType: 'T-Shirt', // Changed to T-Shirt
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], // Added more sizes
    fitType: 'Boxy',
    color: 'White',
    isNewArrival: false,
    isBestSelling: false,
    isFeatured: true,
    rating: 4.2,
  },
  {
    id: '9',
    name: 'Dark Wash Denim Shirt', // More descriptive name
    image: 'products/almost.jpg',
    description: 'A stylish dark wash denim shirt, perfect for any occasion.',
    composition: '100% Denim Cotton',
    price: 59.99,
    inStock: true,
    category: 'Men',
    productType: 'Shirt',
    size: ['S', 'M', 'L', 'XL'], // Added more sizes
    fitType: 'Regular',
    color: 'Blue',
    isNewArrival: true,
    isBestSelling: true,
    isFeatured: true,
    rating: 4.9,
  },
];