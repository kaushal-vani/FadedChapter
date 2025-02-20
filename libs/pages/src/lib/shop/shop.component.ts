import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { FilterComponent, FilterService, Product, ProductMock, SortComponent } from '@faded-chapter/utils';
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
  skeletonCountArray: number[] = []; // Skeleton loader placeholders
  isLoading = true; // Initial loading state

  @ViewChild(FilterComponent) filterComponent!: FilterComponent;
  @ViewChild(SortComponent) sortComponent!: SortComponent;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private filterService: FilterService // Inject filter service
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.filteredProducts = [...this.products];

    setTimeout(() => {
      this.updateSkeletonCount();
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);

    this.updateSkeletonCount();

    // Listen for route changes and reset filters
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.resetFilters();
      }
    });
  }

  resetFilters(): void {
    this.filterService.resetFilters(); // Reset filters in service
    this.filteredProducts = [...this.products]; // Show all products
    this.cdRef.detectChanges();
  }

  updateSkeletonCount(): void {
    const defaultSkeletonCount = 8;
    this.skeletonCountArray = new Array(defaultSkeletonCount).fill(0);
  }

  openFilter(): void {
    this.filterComponent?.openFilter();
  }

  openSort(): void {
    this.sortComponent?.openSort();
  }

  applyFilters(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.filteredProducts = this.products.filter((product) => {
        let matches = true;
        const filters = this.filterComponent.selectedFilters;

        if (filters.category?.length) {
          matches = matches && filters.category.includes(product.category);
        }
        if (filters.productType?.length) {
          matches = matches && filters.productType.includes(product.productType);
        }
        if (filters.size?.length) {
          matches = matches && filters.size.some(
            (selectedSize) => product.size.some((s) => s.size === selectedSize)
          );
        }
        if (filters.fitType?.length) {
          matches = matches && filters.fitType.includes(product.fitType);
        }
        if (filters.color?.length) {
          matches = matches && filters.color.includes(product.color);
        }
        if (typeof filters.inStock === 'boolean') {
          matches = matches && product.inStock === filters.inStock;
        }
        if (filters.priceRange) {
          const { min, max } = filters.priceRange;
          matches = matches && product.price >= min && product.price <= max;
        }
        if (filters.discountOnly) {
          matches = matches && product.discountPercentage != null && product.discountPercentage > 0;
        }

        return matches;
      });

      this.updateSkeletonCount();
      this.isLoading = false;
    }, 1000);
  }

  applySort(sortData: { sortOption: string; sortOrder: string }): void {
    const { sortOption, sortOrder } = sortData;
    this.isLoading = true;
  
    setTimeout(() => {
      // Recalculate in-stock status dynamically based on size selection
      if (sortOption === 'In Stock') {
        this.filteredProducts = this.filteredProducts.sort((a, b) => {
          const selectedSize = this.filterService.getSelectedSize();
  
          const stockA = selectedSize
            ? a.size.find((s) => s.size === selectedSize)?.stock || 0
            : a.size.reduce((acc, s) => acc + s.stock, 0);
  
          const stockB = selectedSize
            ? b.size.find((s) => s.size === selectedSize)?.stock || 0
            : b.size.reduce((acc, s) => acc + s.stock, 0);
  
          return stockB - stockA; // Sort descending by stock count
        });
      } else if (sortOption === 'Price: Low to High') {
        this.filteredProducts = this.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'Price: High to Low') {
        this.filteredProducts = this.filteredProducts.sort((a, b) => b.price - a.price);
      } 
      // Apply sorting order (Ascending / Descending)
      if (sortOrder === 'Out Of Stock') {
        this.filteredProducts.reverse();
      }
  
      this.updateSkeletonCount();
      this.isLoading = false;
    }, 1000);
  }
  
}
