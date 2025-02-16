import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '@faded-chapter/shared';

@Component({
  selector: 'lib-home',
  imports: [CommonModule,HeroBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
