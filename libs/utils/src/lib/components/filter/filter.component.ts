import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { FilterOptions } from '../../models/filter/filter.interface';
@Component({
  selector: 'lib-filter',
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements AfterViewInit {
  @ViewChild('offcanvasFilter') offcanvasElement!: ElementRef;
  private offcanvasInstance!: bootstrap.Offcanvas;

  selectedFilters: FilterOptions = {};

  @Output() filterChange: EventEmitter<FilterOptions> = new EventEmitter();

  ngAfterViewInit(): void {
    if (this.offcanvasElement) {
      this.offcanvasInstance = new bootstrap.Offcanvas(this.offcanvasElement.nativeElement);
    }
  }

  openFilter(): void {
    if (this.offcanvasInstance) {
      this.offcanvasInstance.show();
    } else {
      console.error('Offcanvas instance is undefined');
    }
  }

  closeFilter(): void {
    if (this.offcanvasInstance) {
      this.offcanvasInstance.hide();
    }
  }
  toggleFilter(property: string, value: string | number | boolean | { min: number; max: number }) {
    // Check if the property exists and is an array
    if (!this.selectedFilters[property]) {
      this.selectedFilters[property] = [];
    }
  
    // Ensure the property is an array before using array methods
    if (Array.isArray(this.selectedFilters[property])) {
      const selectedFilterArray = this.selectedFilters[property] as (string | number)[]; // Type assertion for string or number array
      
      if (typeof value === 'string' || typeof value === 'number') {
        const index = selectedFilterArray.indexOf(value); 
        if (index === -1) {
          selectedFilterArray.push(value); // Add the value if it doesn't exist
        } else {
          selectedFilterArray.splice(index, 1); // Remove the value if it already exists
        }
      } else {
        // Handle other types (boolean, object)
        console.error('Invalid value type for this filter property');
      }
    } else if (typeof this.selectedFilters[property] === 'boolean') {
      // If it's a boolean property like 'inStock' or 'discountOnly'
      this.selectedFilters[property] = value as boolean;
    } else if (typeof this.selectedFilters[property] === 'number') {
      // If it's a number property like 'rating'
      this.selectedFilters[property] = value as number;
    } else if (this.selectedFilters[property] && 'min' in this.selectedFilters[property] && 'max' in this.selectedFilters[property]) {
      // If it's a price range, handle it as an object with min and max values
      this.selectedFilters[property] = value as { min: number; max: number };
    }
  
    this.emitFilterChange();
  }

  // Emit filter changes to parent component
  private emitFilterChange() {
    this.filterChange.emit(this.selectedFilters);
  }

}