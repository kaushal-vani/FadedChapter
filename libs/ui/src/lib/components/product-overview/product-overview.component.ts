import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService, Size } from '@faded-chapter/utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-product-overview',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
})
export class ProductOverviewComponent implements OnInit {
  product: Product | undefined;
  loading = true;
  error: string | null = null;
  selectedSize: Size | undefined;
  availableSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  mainImage = '';
  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productSlug = this.route.snapshot.paramMap.get('slug');

    if (productSlug) {
      this.getProduct(productSlug);
    } else {
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        this.getProductById(productId);
      } else {
        this.handleError('No product identifier found in the URL.');
      }
    }
  }

  private getProduct(slug: string): void {
    this.productService.getProductBySlug(slug).subscribe({
      next: (product) => {
        this.handleSuccess(product);
        this.mainImage = product.image; // Set initial main image
      },
      error: (error) => this.handleError(error.message),
    });
  }

  private getProductById(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.handleSuccess(product);
        this.mainImage = product.image; // Set initial main image
      },
      error: (error) => this.handleError(error.message),
    });
  }

  private handleSuccess(product: Product): void {
    this.product = product;
    this.loading = false;
  }

  private handleError(errorMessage: string): void {
    this.error = errorMessage;
    this.loading = false;
    console.error('Error fetching product:', errorMessage);
  }

  addToCart(): void {
    if (this.product && this.selectedSize) {
      console.log('Added to cart:', this.product.name, 'Size:', this.selectedSize);
      // Implement your add to cart logic here, using this.selectedSize
    }
  }

  switchMainImage(image: string, index: number): void {
    this.mainImage = image;
    this.currentImageIndex = index;
  }
}