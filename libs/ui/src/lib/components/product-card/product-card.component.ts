import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@faded-chapter/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private router: Router) {}

  navigateToProduct(): void {
    this.router.navigate(['/product', this.product.slug]);
  }
}