import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewArrivalComponent } from '@faded-chapter/ui';

@Component({
  selector: 'lib-new-arrivals',
  imports: [CommonModule, NewArrivalComponent],
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.scss',
})
export class NewArrivalsComponent {}
