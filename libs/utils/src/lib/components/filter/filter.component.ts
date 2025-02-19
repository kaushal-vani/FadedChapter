import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { FilterOptions } from '../../models/filter/filter.interface';
import { FilterService } from '../../services/filter/filter.service';
@Component({
  selector: 'lib-filter',
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements AfterViewInit, OnInit {
  @ViewChild('offcanvasFilter') offcanvasElement!: ElementRef;
  private offcanvasInstance!: bootstrap.Offcanvas;

  selectedFilters: FilterOptions = {};

  @Output() filterChange: EventEmitter<FilterOptions> = new EventEmitter();

  constructor(private filterService: FilterService) { } // Inject the service

  ngOnInit(): void {
    this.filterService.selectedFilters$.subscribe(filters => {
      this.selectedFilters = filters;
      this.emitFilterChange(); // Emit after service update
    });
  }


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
    this.filterService.toggleFilter(this.selectedFilters, property, value);
  }

  private emitFilterChange() {
    this.filterChange.emit(this.selectedFilters);
  }
}