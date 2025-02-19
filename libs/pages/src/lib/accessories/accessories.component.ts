import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '@faded-chapter/utils';

@Component({
  selector: 'lib-accessories',
  imports: [CommonModule, SearchComponent],
  templateUrl: './accessories.component.html',
  styleUrl: './accessories.component.scss',
})
export class AccessoriesComponent {}
