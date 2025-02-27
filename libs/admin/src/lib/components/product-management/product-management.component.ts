import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  isCollaboration?: boolean;
  discountPercentage?: number;
  rating?: number;
  slug: string;
}

export type Category = 'Men' | 'Women' | 'Unisex';
export type Color = 'Black' | 'White' | 'Red' | 'Blue' | 'Gray';
export type FitType = 'Regular' | 'Relaxed' | 'Boxy' | 'Slim' | 'Oversized';
export type ProductType = 'T-Shirt' | 'Hoodie' | 'Shirt' | 'Polo' | 'Jeans' | 'Sweater' | 'Shorts' | 'Accessories';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';


@Component({
  selector: 'lib-product-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss',
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [
    {
      id: '1', name: 'Burgundy Shirt', image: '', description: '', composition: '', price: 18.99, inStock: true, category: 'Men', productType: 'T-Shirt', size: [{ size: 'L', stock: 10, available: true }], fitType: 'Regular', color: 'Red', isFeatured: true, slug: 'burgundy-shirt'
    },
    {
      id: '2', name: 'Slim Jeans', image: '', description: '', composition: '', price: 65.99, inStock: true, category: 'Men', productType: 'Jeans', size: [{ size: 'M', stock: 5, available: true }], fitType: 'Slim', color: 'Blue', isFeatured: true, slug: 'slim-jeans'
    },
    {
      id: '3', name: 'White Shirt', image: '', description: '', composition: '', price: 15.99, inStock: true, category: 'Women', productType: 'T-Shirt', size: [{ size: 'S', stock: 20, available: true }], fitType: 'Regular', color: 'White', isFeatured: false, slug: 'white-shirt', 
    },
    {
      id: '4', name: 'Black Shirt', image: '', description: '', composition: '', price: 19.99, inStock: true, category: 'Unisex', productType: 'T-Shirt', size: [{ size: 'M', stock: 15, available: true }], fitType: 'Regular', color: 'Black', isFeatured: true, slug: 'black-shirt',
    }
  ];

  searchTerm = '';
  sortColumn = 'name';
  sortDirection = 'asc';
  currentPage = 1;
  pageSize = 4;

  ngOnInit(): void {
    this.sort(this.sortColumn);
  }

  get filteredProducts(): Product[] {
    const filtered = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filtered.slice(startIndex, endIndex);
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.products.sort((a, b) => {
      let aValue: any = a[this.sortColumn as keyof Product];
      let bValue: any = b[this.sortColumn as keyof Product];

      if (column === 'inStock') {
        aValue = a.inStock ? 'false' : 'true';
        bValue = b.inStock ? 'false' : 'true';
      }

      if (column === 'isFeatured') {
        aValue = a.isFeatured ? 'true' : 'false';
        bValue = b.isFeatured ? 'true' : 'false';
      }

      if (column === 'size') {
        aValue = a.size[0]?.size;
        bValue = b.size[0]?.size;
      }

      if (aValue === undefined || bValue === undefined) {
        if (aValue === undefined && bValue === undefined) {
          return 0;
        } else if (aValue === undefined) {
          return 1;
        } else {
          return -1;
        }
      }

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  createProduct(): void {
    console.log('Create product clicked');
  }

  editProduct(product: Product): void {
    console.log('Edit product:', product);
  }

  deleteProduct(productID: string){
    console.log('Edit product:', productID);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.products.length) {
      this.currentPage++;
    }
  }
}