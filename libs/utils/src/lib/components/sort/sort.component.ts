import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'lib-sort',
  imports: [CommonModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss',
})
export class SortComponent implements AfterViewInit {
  @ViewChild('offcanvasSort') offcanvasElement!: ElementRef;
  private offcanvasInstance!: bootstrap.Offcanvas;

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