import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { SortOption } from '../../types/sort/sort.type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-sort',
  imports: [CommonModule,FormsModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss',
})
export class SortComponent implements AfterViewInit {
  @ViewChild('offcanvasSort') offcanvasElement!: ElementRef;
  private offcanvasInstance!: bootstrap.Offcanvas;

  @Output() sortChange = new EventEmitter<{ sortOption: SortOption, sortOrder: 'Ascending' | 'Descending' }>();

  selectedSortOption: SortOption = 'Price: Low to High';  // Default sort option
  selectedSortOrder: 'Ascending' | 'Descending' = 'Ascending'; // Default sort order

  // Emit the selected sort option and order to parent component (Shop)
  applySort() {
    this.sortChange.emit({
      sortOption: this.selectedSortOption,
      sortOrder: this.selectedSortOrder
    });
    this.closeSort()
  }
  ngAfterViewInit(): void {
    if (this.offcanvasElement) {
      this.offcanvasInstance = new bootstrap.Offcanvas(this.offcanvasElement.nativeElement);
    }
  }

  openSort(): void {
    if (this.offcanvasInstance) {
      this.offcanvasInstance.show();
    } else {
      console.error('Offcanvas instance is undefined');
    }
  }

  closeSort(): void {
    if (this.offcanvasInstance) {
      this.offcanvasInstance.hide();
    }
  }
}