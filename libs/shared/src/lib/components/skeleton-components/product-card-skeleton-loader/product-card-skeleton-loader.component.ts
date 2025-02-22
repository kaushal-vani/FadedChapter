import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-product-card-skeleton-loader',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './product-card-skeleton-loader.component.html',
  styleUrl: './product-card-skeleton-loader.component.scss',
})
export class ProductCardSkeletonLoaderComponent {
  constructor(private cdr: ChangeDetectorRef) {
    setTimeout(() => {
      this.cdr.detectChanges(); // Ensure animation applies
    });
  }
}
