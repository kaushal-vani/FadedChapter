import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-hero-banner',
  imports: [CommonModule],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
})
export class HeroBannerComponent  {
  heroGif = "logos/banner.gif";  // Placeholder image path
  heroLink = "/shop-now";
  heroButtonText = "Shop Now";
  }