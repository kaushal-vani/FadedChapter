import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMock } from '@faded-chapter/utils';
import { ProductCardComponent } from '../../product-card/product-card.component';

@Component({
  selector: 'lib-best-selling',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.scss',
})
export class BestSellingComponent {
  bestSelling = ProductMock.filter(product => product.isBestSelling)
}
