import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Ensure the accordion items are collapsed initially
    const accordionItems = document.querySelectorAll('.accordion-button');

    accordionItems.forEach(item => {
      // Check if the item isn't collapsed and force it to be collapsed
      if (!item.classList.contains('collapsed')) {
        item.classList.add('collapsed');
      }
    });
  }
}