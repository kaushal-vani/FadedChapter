import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { SortOption, SortOrder } from '../../types/sort/sort.type';
import { FormsModule } from '@angular/forms';
import { SortService } from '../../services/sort/sort.service';

@Component({
  selector: 'lib-sort',
  imports: [CommonModule,FormsModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss',
})
export class SortComponent implements AfterViewInit, OnInit {
  @ViewChild('offcanvasSort') offcanvasElement!: ElementRef;
  private offcanvasInstance!: bootstrap.Offcanvas;

  sortOptions: { sortOption: SortOption; sortOrder: SortOrder } = {
    sortOption: 'Price: Low to High',
    sortOrder: 'Ascending'
  };

  @Output() sortChange = new EventEmitter<{ sortOption: SortOption; sortOrder: SortOrder }>();

  constructor(private sortService: SortService) { } // Inject the service

  ngOnInit(): void {
    this.sortService.sortOptions$.subscribe(options => {
      this.sortOptions = options;
      this.sortChange.emit(this.sortOptions); // Emit when options change
    });
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

  applySort() {
    this.sortService.updateSortOptions(this.sortOptions);
    this.closeSort();
  }
}