import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Size {
  label: string;
  chest?: string; // Optional for women
  bust?: string; // Optional for men
  waist: string;
  hip: string;
}

@Component({
  selector: 'lib-size-guide',
  imports: [CommonModule],
  templateUrl: './size-guide.component.html',
  styleUrl: './size-guide.component.scss',
})
export class SizeGuideComponent {
  selectedGuide: 'men' | 'women' = 'men';

  menSizes: Size[] = [
    { label: 'S', chest: '34-36', waist: '28-30', hip: '34-36' },
    { label: 'M', chest: '38-40', waist: '32-34', hip: '38-40' },
    { label: 'L', chest: '42-44', waist: '36-38', hip: '42-44' },
    { label: 'XL', chest: '46-48', waist: '40-42', hip: '46-48' }
  ];

  womenSizes: Size[] = [
    { label: 'XS', bust: '30-32', waist: '22-24', hip: '32-34' },
    { label: 'S', bust: '34-36', waist: '26-28', hip: '36-38' },
    { label: 'M', bust: '38-40', waist: '30-32', hip: '40-42' },
    { label: 'L', bust: '42-44', waist: '34-36', hip: '44-46' }
  ];

  get displayedSizes(): Size[] {
    return this.selectedGuide === 'men' ? this.menSizes : this.womenSizes;
  }

  toggleSizeGuide(type: 'men' | 'women') {
    this.selectedGuide = type;
  }
}