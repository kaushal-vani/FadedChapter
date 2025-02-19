import { Injectable } from '@angular/core';
import { FilterOptions } from '../../models/filter/filter.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private selectedFiltersSubject = new BehaviorSubject<FilterOptions>({});
  public selectedFilters$ = this.selectedFiltersSubject.asObservable();

  updateFilters(filters: FilterOptions) {
    this.selectedFiltersSubject.next(filters);
  }

  toggleFilter(currentFilters: FilterOptions, property: string, value: string | number | boolean | { min: number; max: number }) {
    const updatedFilters: FilterOptions = { ...currentFilters }; // Create a copy

    if (!updatedFilters[property]) {
      updatedFilters[property] = [];
    }

    if (Array.isArray(updatedFilters[property])) {
      const selectedFilterArray = updatedFilters[property] as (string | number)[];

      if (typeof value === 'string' || typeof value === 'number') {
        const index = selectedFilterArray.indexOf(value);
        if (index === -1) {
          selectedFilterArray.push(value);
        } else {
          selectedFilterArray.splice(index, 1);
        }
      } else {
        console.error('Invalid value type for this filter property');
      }
    } else if (typeof updatedFilters[property] === 'boolean') {
      updatedFilters[property] = value as boolean;
    } else if (typeof updatedFilters[property] === 'number') {
      updatedFilters[property] = value as number;
    } else if (updatedFilters[property] && 'min' in updatedFilters[property] && 'max' in updatedFilters[property]) {
      updatedFilters[property] = value as { min: number; max: number };
    }

    this.updateFilters(updatedFilters); // Update using the service
  }
}
