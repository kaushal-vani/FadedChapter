import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductMock } from '@faded-chapter/utils';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { ProductCardSkeletonLoaderComponent } from '@faded-chapter/shared';

@Component({
  selector: 'lib-featured-products',
  imports: [CommonModule,ProductCardSkeletonLoaderComponent, ProductCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent {
  featuredProducts: Product[] = []; // Explicitly type as Product[]
  isLoading = true;
  skeletonCount = 0;

  constructor() {
    // Get skeleton count dynamically based on available featured products
    const allFeaturedProducts = ProductMock.filter(product => product.isFeatured);
    this.skeletonCount = allFeaturedProducts.length;

    setTimeout(() => {
      this.featuredProducts = allFeaturedProducts;
      this.isLoading = false;
    }, 1000);
  }
}