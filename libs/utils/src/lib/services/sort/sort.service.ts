import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortOption } from '../../types/sort/sort.type';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  private sortOptionsSubject = new BehaviorSubject<{
    sortOption: SortOption;
    sortOrder: 'Ascending' | 'Descending';
  }>({
    sortOption: 'Price: Low to High', // Default sort option
    sortOrder: 'Ascending', // Default sort order
  });
  public sortOptions$ = this.sortOptionsSubject.asObservable();

  updateSortOptions(sortOptions: {
    sortOption: SortOption;
    sortOrder: 'Ascending' | 'Descending';
  }) {
    this.sortOptionsSubject.next(sortOptions);
  }
}
