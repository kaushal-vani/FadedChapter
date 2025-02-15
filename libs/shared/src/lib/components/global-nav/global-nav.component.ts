import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-global-nav',
  imports: [CommonModule,FormsModule],
  templateUrl: './global-nav.component.html',
  styleUrl: './global-nav.component.css',
})
export class GlobalNavComponent {
  showSearch = false; // To toggle search box visibility
  searchQuery = ''; // Bind to the search input field

  toggleSearch(): void {
    this.showSearch = !this.showSearch; // Toggle visibility of the search box
  }
}