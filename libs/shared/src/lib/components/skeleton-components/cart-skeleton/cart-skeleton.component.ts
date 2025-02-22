import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-cart-skeleton',
  imports: [CommonModule,RouterModule],
  templateUrl: './cart-skeleton.component.html',
  styleUrl: './cart-skeleton.component.scss',
})
export class CartSkeletonComponent {}
