import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { FilterComponent, FilterService, Product, ProductService, SortComponent } from '@faded-chapter/utils';
import { ProductCardComponent } from '@faded-chapter/ui';
import { ProductCardSkeletonLoaderComponent } from '@faded-chapter/shared';

@Component({
  selector: 'lib-shop',
  standalone: true,
  imports: [CommonModule, FilterComponent, SortComponent, ProductCardSkeletonLoaderComponent, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  skeletonCountArray: number[] = [];
  isLoading = true;

  @ViewChild(FilterComponent) filterComponent!: FilterComponent;
  @ViewChild(SortComponent) sortComponent!: SortComponent;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private filterService: FilterService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchProducts();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.resetFilters();
      }
    });
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(response => {
      console.log("Products received:", response);
      this.products = response.products;
      this.applyFilters();
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  resetFilters(): void {
    this.filterService.resetFilters();
    this.applyFilters();
    this.cdRef.detectChanges();
  }

  applyFilters(): void {
    this.isLoading = true;
    setTimeout(() => {
      const filters = this.filterComponent?.selectedFilters;
      this.displayedProducts = this.products.filter((product) => {
        let matches = true;

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

      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 500);
  }

  applySort(sortData: { sortOption: string; sortOrder: string }): void {
    const { sortOption, sortOrder } = sortData;
    this.isLoading = true;

    setTimeout(() => {
      if (sortOption === 'Price: Low to High') {
        this.displayedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'Price: High to Low') {
        this.displayedProducts.sort((a, b) => b.price - a.price);
      }

      if (sortOrder === 'Out Of Stock') {
        this.displayedProducts.reverse();
      }

      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 500);
  }

  openFilter(): void {
    this.filterComponent?.openFilter();
  }

  openSort(): void {
    this.sortComponent?.openSort();
  }
}
