import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@faded-chapter/utils';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { ProductCardSkeletonLoaderComponent } from '@faded-chapter/shared';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-best-selling',
  imports: [CommonModule,ProductCardSkeletonLoaderComponent, ProductCardComponent],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.scss',
})
export class BestSellingComponent implements OnInit {
  bestSelling: Product[] = [];
  isLoading = true;
  skeletonCount = 4; // Default skeleton count

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBestSelling();
  }

  fetchBestSelling() {
    this.http.get<Product[]>('http://localhost:5001/api/products/best-selling').subscribe({
      next: (products) => {
        this.bestSelling = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching best selling products:', error);
        this.isLoading = false;
      }
    });
  }
}