import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortOption, SortOrder } from '../../types/sort/sort.type';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  private sortOptionsSubject = new BehaviorSubject<{
    sortOption: SortOption;
    sortOrder: SortOrder;
  }>({
    sortOption: 'Price: Low to High', // Default sort option
    sortOrder: 'Ascending', // Default sort order
  });
  public sortOptions$ = this.sortOptionsSubject.asObservable();

  updateSortOptions(sortOptions: {
    sortOption: SortOption;
    sortOrder: SortOrder;
  }) {
    this.sortOptionsSubject.next(sortOptions);
  }
}
