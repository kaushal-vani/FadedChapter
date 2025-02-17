import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'lib-filter',
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements AfterViewInit {
  @ViewChild('offcanvasFilter') offcanvasElement!: ElementRef;
  private offcanvasInstance!: bootstrap.Offcanvas;

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
}