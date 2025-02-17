import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent, Product, ProductMock, SortComponent } from '@faded-chapter/utils';
import { ProductCardComponent } from '@faded-chapter/ui';

@Component({
  selector: 'lib-shop',
  imports: [CommonModule,FilterComponent, SortComponent,ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  products : Product[] = ProductMock
  @ViewChild(FilterComponent) filterComponent!: FilterComponent;
  @ViewChild(SortComponent) sortComponent!: SortComponent;


  openFilter(): void {
    if (this.filterComponent) {
      this.filterComponent.openFilter();
    } else {
      console.error('FilterComponent is not initialized yet');
    }
  }

  openSort():void {
    if (this.sortComponent) {
      this.sortComponent.openSort();
    } else {
      console.error('SortComponent is not initialized yet');
    }
  }
}
