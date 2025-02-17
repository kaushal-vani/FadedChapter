import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent, SortComponent } from '@faded-chapter/utils';

@Component({
  selector: 'lib-shop',
  imports: [CommonModule,FilterComponent, SortComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
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
