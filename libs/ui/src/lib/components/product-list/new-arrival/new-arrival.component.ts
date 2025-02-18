import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { ProductMock } from '@faded-chapter/utils';

@Component({
  selector: 'lib-new-arrival',
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './new-arrival.component.html',
  styleUrl: './new-arrival.component.scss',
})
export class NewArrivalComponent {
  newArrival = ProductMock.filter(product => product.isNewArrival)
}
