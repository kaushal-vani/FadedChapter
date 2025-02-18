import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent, Product, ProductMock, SortComponent } from '@faded-chapter/utils';
import { ProductCardComponent } from '@faded-chapter/ui';

@Component({
  selector: 'lib-shop',
  imports: [CommonModule,FilterComponent, SortComponent,ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit{
  products : Product[] = ProductMock
  filteredProducts: Product[] = [...this.products]; 
  @ViewChild(FilterComponent) filterComponent!: FilterComponent;
  @ViewChild(SortComponent) sortComponent!: SortComponent;

ngOnInit(): void {
  this.filteredProducts = this.products;
}
  openFilter(): void {
    if (this.filterComponent) {
      this.filterComponent.openFilter();
    } else {
      console.error('FilterComponent is not initialized yet');
    }
  }

  openSort():void {
    if (this.sortComponent) {
      this.sortComponent.openSort();
    } else {
      console.error('SortComponent is not initialized yet');
    }
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      let matches = true;

      // Apply each selected filter here
      if (this.filterComponent.selectedFilters.category && this.filterComponent.selectedFilters.category.length) {
        matches = matches && this.filterComponent.selectedFilters.category.includes(product.category);
      }
      if (this.filterComponent.selectedFilters.productType && this.filterComponent.selectedFilters.productType.length) {
        matches = matches && this.filterComponent.selectedFilters.productType.includes(product.productType);
      }
      if (this.filterComponent.selectedFilters.size && this.filterComponent.selectedFilters.size.length) {
        matches = matches && this.filterComponent.selectedFilters.size.some(size => product.size.includes(size));
      }
      if (this.filterComponent.selectedFilters.fitType && this.filterComponent.selectedFilters.fitType.length) {
        matches = matches && this.filterComponent.selectedFilters.fitType.includes(product.fitType);
      }
      if (this.filterComponent.selectedFilters.color && this.filterComponent.selectedFilters.color.length) {
        matches = matches && this.filterComponent.selectedFilters.color.includes(product.color);
      }
      if (typeof this.filterComponent.selectedFilters.inStock === 'boolean') {
        matches = matches && product.inStock === this.filterComponent.selectedFilters.inStock;
      }
      if (this.filterComponent.selectedFilters.priceRange) {
        const { min, max } = this.filterComponent.selectedFilters.priceRange;
        matches = matches && product.price >= min && product.price <= max;
      }
      if (this.filterComponent.selectedFilters.discountOnly) {
        matches = matches && product.discountPercentage != null && product.discountPercentage > 0;
      }

      return matches;
    });
  }

  applySort(sortData: { sortOption: string; sortOrder: string }) {
    const { sortOption, sortOrder } = sortData;
  
    // Sorting logic for "In Stock"
    if (sortOption === 'In Stock') {
      this.filteredProducts = this.filteredProducts.sort((a, b) => {
        // Sort products based on inStock status
        if (a.inStock && !b.inStock) return -1; // a comes first if in stock, b comes second
        if (!a.inStock && b.inStock) return 1; // b comes first if in stock, a comes second
        return 0; // No change if both have same stock status
      });
    }
    // Sorting by "Price: Low to High"
    else if (sortOption === 'Price: Low to High') {
      this.filteredProducts = this.filteredProducts.sort((a, b) => a.price - b.price);
    }
    // Sorting by "Price: High to Low"
    else if (sortOption === 'Price: High to Low') {
      this.filteredProducts = this.filteredProducts.sort((a, b) => b.price - a.price);
    }
    // Sorting by "New Arrivals"
    else if (sortOption === 'New Arrivals') {
      // Assuming that `isNewArrival` is a property of `Product`
      this.filteredProducts = this.filteredProducts.sort((a) => (a.isNewArrival ? -1 : 1));
    }
  
    // Apply sort order ("Ascending" or "Descending")
    if (sortOrder === 'Descending') {
      this.filteredProducts = this.filteredProducts.reverse();  // Reverse the array if "Descending"
    }
  }
}