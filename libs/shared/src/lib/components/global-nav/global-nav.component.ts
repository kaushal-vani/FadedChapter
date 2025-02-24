import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SearchComponent } from '@faded-chapter/utils';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-global-nav',
  imports: [CommonModule, FormsModule, RouterModule, SearchComponent],
  templateUrl: './global-nav.component.html',
  styleUrl: './global-nav.component.scss',
})
export class GlobalNavComponent implements OnDestroy {
  isSearchOpen = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.closeSearch();
      });
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    this.updateHeaderVisibility();
  }

  closeSearch() {
    this.isSearchOpen = false;
    this.updateHeaderVisibility();
  }

  updateHeaderVisibility() {
    const header = document.querySelector('.bg-light.sticky-top');
    if (header) {
      if (this.isSearchOpen) {
        header.classList.add('search-active');
      } else {
        header.classList.remove('search-active');
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const searchBox = document.querySelector('.floating-search-container');
    if (this.isSearchOpen && searchBox && !searchBox.contains(event.target as Node)) {
      this.closeSearch();
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape() {
    this.closeSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}