import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService, Product } from '@faded-chapter/utils';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  selectedSize: string | null = null;
  private filterSubscription!: Subscription;

  constructor(private router: Router, private filterService: FilterService) {}

  ngOnInit(): void {
    // Subscribe to filter changes
    this.filterSubscription = this.filterService.selectedFilters$.subscribe(filters => {
      this.selectedSize = filters.size && filters.size.length > 0 ? filters.size[0] : null;
    });
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  navigateToProduct(): void {
    this.router.navigate(['/product', this.product.slug]);
  }

  get isSelectedSizeAvailable(): boolean {
    if (!this.selectedSize) return true; // If no size is selected, default to true
    const selectedSize = this.product.size.find(s => s.size === this.selectedSize);
    return selectedSize ? selectedSize.available : false;
  }
}