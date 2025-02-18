import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductMock } from '@faded-chapter/utils';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { ProductCardSkeletonLoaderComponent } from '@faded-chapter/shared';

@Component({
  selector: 'lib-best-selling',
  imports: [CommonModule,ProductCardSkeletonLoaderComponent, ProductCardComponent],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.scss',
})
export class BestSellingComponent {
  bestSelling : Product[] = []; 
    isLoading = true;
    skeletonCount = 0;

    constructor() {
        // Get skeleton count dynamically based on available featured products
        const allBestSelling = ProductMock.filter(product => product.isNewArrival);
        this.skeletonCount = allBestSelling.length;
    
        setTimeout(() => {
          this.bestSelling = allBestSelling;
          this.isLoading = false;
        }, 1000);
      }
}
