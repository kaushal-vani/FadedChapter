import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SearchComponent } from '@faded-chapter/utils';
import { Subject, filter, takeUntil, Subscription } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'lib-global-nav',
  imports: [CommonModule, FormsModule, RouterModule, SearchComponent],
  templateUrl: './global-nav.component.html',
  styleUrl: './global-nav.component.scss',
})
export class GlobalNavComponent implements OnInit, OnDestroy {
  isSearchOpen = false;
  itemCount = 0; // Add itemCount property
  private destroy$ = new Subject<void>();
  private itemCountSubscription: Subscription | undefined; // Add subscription property

  constructor(private router: Router, private cartService: CartService) { // Inject CartService
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.closeSearch();
      });
  }

  ngOnInit(): void {
    this.itemCountSubscription = this.cartService.itemCount$.subscribe(
      (count) => (this.itemCount = count)
    );
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
    if(this.itemCountSubscription){
      this.itemCountSubscription.unsubscribe();
    }
  }
}