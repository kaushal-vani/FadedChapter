import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@faded-chapter/utils';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { ProductCardSkeletonLoaderComponent } from '@faded-chapter/shared';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-featured-products',
  imports: [CommonModule,ProductCardSkeletonLoaderComponent, ProductCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts: Product[] = [];
  isLoading = true;
  skeletonCount = 4; // Default skeleton count

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchFeaturedProducts();
  }

  fetchFeaturedProducts() {
    this.http.get<Product[]>('http://localhost:5001/api/products/featured').subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching featured products:', error);
        this.isLoading = false;
      }
    });
  }
}