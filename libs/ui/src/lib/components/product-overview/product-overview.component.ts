import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Product,
  ProductService,
  Size,
  Category,
  ProductType,
} from '@faded-chapter/utils';
import { FormsModule } from '@angular/forms';
import {
  ProductOverviewSkeletonLoaderComponent,
  SizeGuideComponent,
} from '@faded-chapter/shared';
import { SuggestedProductsComponent } from '../product-list/suggested-products/suggested-products.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-product-overview',
  imports: [
    CommonModule,
    FormsModule,
    ProductOverviewSkeletonLoaderComponent,
    SizeGuideComponent,
    SuggestedProductsComponent,
  ], // Add SuggestedProductsComponent to imports
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription | undefined;
  product: Product | undefined;
  loading = true;
  error: string | null = null;
  selectedSize: Size | undefined;
  selectedQuantity = 0;
  availableSizes: Size[] = [];
  mainImage = '';
  currentImageIndex = 0;
  currentProductId: string | undefined; 

  selectedCategory: Category | undefined;
  selectedProductType: ProductType | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,private router: Router 
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => { // Use params instead of snapshot
      this.loading = true; // Reset loading state
      this.error = null; // Clear any previous errors
      const productSlug = params['slug'];
      const productId = params['id'];

      if (productSlug) {
        this.getProduct(productSlug);
      } else if (productId) {
        this.getProductById(productId);
      } else {
        this.handleError('No product identifier found in the URL.');
      }
    });
  }

  private getProduct(slug: string): void {
    this.productService.getProductBySlug(slug).subscribe({
      next: (product) => {
        this.handleSuccess(product);
        this.mainImage = product.image;
        this.currentProductId = product.id;
      },
      error: (error) => this.handleError(error.message),
    });
  }

  private getProductById(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.handleSuccess(product);
        this.mainImage = product.image;
        this.currentProductId = product.id;
      },
      error: (error) => this.handleError(error.message),
    });
  }

  private handleSuccess(product: Product): void {
    this.product = product;
    this.loading = false;
    this.availableSizes = product.size.map((s) => s.size);
  }

  private handleError(errorMessage: string): void {
    this.error = errorMessage;
    this.loading = false;
    console.error('Error fetching product:', errorMessage);
  }

  addToCart(): void {
    if (!this.product || !this.selectedSize || this.selectedQuantity <= 0)
      return;

    const selectedSizeObj = this.product.size.find(
      (s) => s.size === this.selectedSize
    );

    if (!selectedSizeObj || !selectedSizeObj.available) {
      console.warn('Selected size is not available.');
      return;
    }

    console.log(
      'Added to cart:',
      this.product.name,
      'Size:',
      this.selectedSize,
      'Quantity:',
      this.selectedQuantity
    );

    // Now you can access the category and product type:
    if (this.selectedCategory && this.selectedProductType) {
      console.log('Category:', this.selectedCategory); // Assuming Category has a 'name' property
      console.log('Product Type:', this.selectedProductType); // Assuming ProductType has a 'name' property
    }
  }

  switchMainImage(image: string, index: number): void {
    this.mainImage = image;
    this.currentImageIndex = index;
  }

  selectSize(size: Size): void {
    const selectedSizeObj = this.product?.size.find((s) => s.size === size);
    if (selectedSizeObj?.available) {
      this.selectedSize = size;
    }
    console.log('Selected Size:', this.selectedSize);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }
}
