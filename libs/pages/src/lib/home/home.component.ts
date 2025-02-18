import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '@faded-chapter/shared';
import { BestSellingComponent, FeaturedProductsComponent } from '@faded-chapter/ui';

@Component({
  selector: 'lib-home',
  imports: [CommonModule,HeroBannerComponent, FeaturedProductsComponent,BestSellingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  activeComponent = 'featured'; // Default view

  showComponent(component: string) {
    this.activeComponent = component;
  }
}
