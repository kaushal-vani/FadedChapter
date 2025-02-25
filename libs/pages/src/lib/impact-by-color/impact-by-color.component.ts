import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'lib-impact-by-color',
  imports: [CommonModule,CheckoutComponent],
  templateUrl: './impact-by-color.component.html',
  styleUrl: './impact-by-color.component.scss',
})
export class ImpactByColorComponent {}
