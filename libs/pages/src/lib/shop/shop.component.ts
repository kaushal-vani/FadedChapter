import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '@faded-chapter/utils';

@Component({
  selector: 'lib-shop',
  imports: [CommonModule,FilterComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  @ViewChild(FilterComponent) filterComponent!: FilterComponent;

  openFilter(): void {
    if (this.filterComponent) {
      this.filterComponent.openFilter();
    } else {
      console.error('FilterComponent is not initialized yet');
    }
  }
}
