import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardSkeletonLoaderComponent } from '@faded-chapter/shared';

@Component({
  selector: 'lib-accessories',
  imports: [CommonModule, ProductCardSkeletonLoaderComponent],
  templateUrl: './accessories.component.html',
  styleUrl: './accessories.component.scss',
})
export class AccessoriesComponent {}
