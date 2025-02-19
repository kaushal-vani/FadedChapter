import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductMock } from '@faded-chapter/utils';
import { ProductCardSkeletonLoaderComponent } from '@faded-chapter/shared';
import { ProductCardComponent } from '../../product-card/product-card.component';

@Component({
  selector: 'lib-suggested-products',
  imports: [
    CommonModule,
    ProductCardSkeletonLoaderComponent,
    ProductCardComponent,
  ],
  templateUrl: './suggested-products.component.html',
  styleUrl: './suggested-products.component.scss',
})
export class SuggestedProductsComponent implements OnChanges {
  // Removed OnInit
  @Input() currentProductId: string | undefined;
  suggestedProducts: Product[] = [];
  isLoading = true;
  skeletonCount = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['currentProductId'] &&
      changes['currentProductId'].currentValue !== undefined
    ) {
      this.loadSuggestedProducts();
    }
  }

  loadSuggestedProducts(): void {
    const availableProducts = ProductMock.filter(
      (product) =>
        product.inStock &&
        (!this.currentProductId || product.id !== this.currentProductId)
    );

    const shuffledProducts = this.shuffleArray(availableProducts);
    this.suggestedProducts = shuffledProducts.slice(0, 4);

    this.skeletonCount = this.suggestedProducts.length;

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  private shuffleArray(array: Product[]): Product[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
