import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMock } from '@faded-chapter/utils';
import { ProductCardComponent } from '../../product-card/product-card.component';

@Component({
  selector: 'lib-featured-products',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent {
  featuredProducts = ProductMock.filter(product => product.isFeatured);
}
