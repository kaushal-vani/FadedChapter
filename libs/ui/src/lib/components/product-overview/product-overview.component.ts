import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductOverviewSkeletonLoaderComponent,
    SizeGuideComponent,
    SuggestedProductsComponent,
  ],
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription | undefined;
  private imageRotationInterval: ReturnType<typeof setInterval> | null = null;
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
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.loading = true;
      this.error = null;
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
      },
      error: (error) => this.handleError(error.message),
    });
  }

  private getProductById(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.handleSuccess(product);
      },
      error: (error) => this.handleError(error.message),
    });
  }

  private handleSuccess(product: Product): void {
    this.product = product;
    this.loading = false;
    this.availableSizes = product.size.map((s) => s.size);
    this.mainImage = product.image;
    this.currentProductId = product.id;
    
    if (this.product?.productGallery && this.product.productGallery.length > 1) {
      this.startImageRotation();
    }
  }

  private handleError(errorMessage: string): void {
    this.error = errorMessage;
    this.loading = false;
    console.error('Error fetching product:', errorMessage);
  }

  addToCart(): void {
    if (!this.product || !this.selectedSize || this.selectedQuantity <= 0) return;

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
  }

  switchMainImage(image: string, index: number): void {
    this.mainImage = image;
    this.currentImageIndex = index;
    this.stopImageRotation(); // Pause rotation when user interacts
  }

  selectSize(size: Size): void {
    const selectedSizeObj = this.product?.size.find((s) => s.size === size);
    if (selectedSizeObj?.available) {
      this.selectedSize = size;
    }
  }

  startImageRotation(): void {
    this.imageRotationInterval = setInterval(() => {
      if (this.product?.productGallery && this.product.productGallery.length > 0) {
        this.currentImageIndex =
          (this.currentImageIndex + 1) % this.product.productGallery.length;
        this.mainImage = this.product.productGallery[this.currentImageIndex];
      }
    }, 5000);
  }
  

  stopImageRotation(): void {
    if (this.imageRotationInterval) {
      clearInterval(this.imageRotationInterval);
      this.imageRotationInterval = null;
    }
  }

  restartImageRotation(): void {
    this.stopImageRotation();
    this.startImageRotation();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    this.stopImageRotation(); // Clean up interval
  }
}
