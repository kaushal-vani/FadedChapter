import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent, Product, ProductMock, SortComponent } from '@faded-chapter/utils';
import { ProductCardComponent } from '@faded-chapter/ui';
import { ProductCardSkeletonLoaderComponent } from '@faded-chapter/shared';

@Component({
  selector: 'lib-shop',
  imports: [CommonModule, FilterComponent, SortComponent, ProductCardSkeletonLoaderComponent, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: Product[] = ProductMock;
  filteredProducts: Product[] = [...this.products];
  skeletonCountArray: number[] = [];  // To hold the count of skeleton loaders
  isLoading = true;  // Controls loading state (starts as true for initial load)
  @ViewChild(FilterComponent) filterComponent!: FilterComponent;
  @ViewChild(SortComponent) sortComponent!: SortComponent;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Ensure skeleton loader shows initially
    this.isLoading = true; // Start loader during initial load
    this.filteredProducts = this.products; // Set initial filtered products

    // Simulate async load delay for initial load
    setTimeout(() => {
      this.updateSkeletonCount(); // Update skeleton count for the loader
      this.isLoading = false; // Stop loader after a delay
      this.cdRef.detectChanges(); // Manually trigger change detection to update the view
    }, 1000);  // Simulate a small delay, you can adjust this value

    // Update skeleton count for initial display
    this.updateSkeletonCount();
  }

  updateSkeletonCount(): void {
    const defaultSkeletonCount = 8;  // Set a fixed number of skeletons to show
    this.skeletonCountArray = new Array(defaultSkeletonCount).fill(0);  // Fill with dummy values to simulate skeletons
  }

  openFilter(): void {
    if (this.filterComponent) {
      this.filterComponent.openFilter();
    } else {
      console.error('FilterComponent is not initialized yet');
    }
  }

  openSort(): void {
    if (this.sortComponent) {
      this.sortComponent.openSort();
    } else {
      console.error('SortComponent is not initialized yet');
    }
  }

  applyFilters(): void {
    this.isLoading = true;  // Show loader when filters are applied

    setTimeout(() => { // Simulate async filtering delay
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

      // After applying filters, update skeleton count and stop loading
      this.updateSkeletonCount();
      this.isLoading = false;  // Stop loading after filtering
    }, 1000);  // Simulate async delay (adjust this as necessary)
  }

  applySort(sortData: { sortOption: string; sortOrder: string }): void {
    const { sortOption, sortOrder } = sortData;
    this.isLoading = true;  // Show loader when sorting is applied

    setTimeout(() => { // Simulate async sorting delay
      // Sorting logic for "In Stock"
      if (sortOption === 'In Stock') {
        this.filteredProducts = this.filteredProducts.sort((a, b) => {
          if (a.inStock && !b.inStock) return -1; // a comes first if in stock, b comes second
          if (!a.inStock && b.inStock) return 1; // b comes first if in stock, a comes second
          return 0;
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
        this.filteredProducts = this.filteredProducts.sort((a) => (a.isNewArrival ? -1 : 1));
      }

      // Apply sort order ("Ascending" or "Descending")
      if (sortOrder === 'Descending') {
        this.filteredProducts = this.filteredProducts.reverse();  // Reverse the array if "Descending"
      }

      // After applying sort, update skeleton count and stop loading
      this.updateSkeletonCount();
      this.isLoading = false;  // Stop loading after sorting
    }, 1000);  // Simulate async delay (adjust this as necessary)
  }
}