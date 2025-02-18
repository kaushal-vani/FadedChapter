import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { Product, ProductMock } from '@faded-chapter/utils';
import { ProductCardSkeletonLoaderComponent } from '@faded-chapter/shared';

@Component({
  selector: 'lib-new-arrival',
  imports: [CommonModule,ProductCardSkeletonLoaderComponent,ProductCardComponent],
  templateUrl: './new-arrival.component.html',
  styleUrl: './new-arrival.component.scss',
})
export class NewArrivalComponent {
  newArrival : Product[] = []; 
  isLoading = true;
  skeletonCount = 0;

  constructor() {
    // Get skeleton count dynamically based on available featured products
    const allNewArrival = ProductMock.filter(product => product.isNewArrival);
    this.skeletonCount = allNewArrival.length;

    setTimeout(() => {
      this.newArrival = allNewArrival;
      this.isLoading = false;
    }, 1000);
  }
}
