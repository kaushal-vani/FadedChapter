import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-hero-banner',
  imports: [CommonModule,RouterModule],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
})
export class HeroBannerComponent  {
  heroGif = "logos/banner.gif";  // Placeholder image path
  heroLink = "/shop";
  heroButtonText = "Shop Now";
  }