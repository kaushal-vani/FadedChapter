import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-theme',
  imports: [CommonModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ThemeComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    // Check if dark mode is saved in localStorage and apply it
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      this.isDarkMode = true;
    }
  }

  // Method to toggle dark mode
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode.toString());  // Save preference to localStorage
  }
}