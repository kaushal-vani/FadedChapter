import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LoginResponse, SearchComponent } from '@faded-chapter/utils';
import { Subject, filter, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'lib-global-nav',
  imports: [CommonModule, FormsModule, RouterModule, SearchComponent],
  templateUrl: './global-nav.component.html',
  styleUrl: './global-nav.component.scss',
})
export class GlobalNavComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName = '';
  showDropdown = false;
  isSearchOpen = false;
  itemCount = 0
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService, // Inject AuthService
    private cdr: ChangeDetectorRef
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.destroy$))
      .subscribe(() => {
        this.closeSearch();
      });
  }

  ngOnInit(): void {
    // Subscribe to authentication changes
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: LoginResponse | null) => {
      this.isLoggedIn = !!user;
      this.userName = user?.name || '';
      this.cdr.detectChanges(); // Detect changes to update UI
    });

    // Subscribe to cart item count
    this.cartService.itemCount$.pipe(takeUntil(this.destroy$)).subscribe((count) => {
      this.itemCount = count;
    });
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    this.cdr.detectChanges(); 
  }

  closeSearch() {
    this.isSearchOpen = false;
    this.cdr.detectChanges(); 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/log-in']);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    this.cdr.detectChanges(); // Force update to show/hide dropdown
  }

  closeDropdown() {
    this.showDropdown = false;
    this.cdr.detectChanges();
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdownElement = document.querySelector('.dropdown-menu');
    const profileElement = document.querySelector('.user-profile');
    
    if (this.showDropdown && dropdownElement && !dropdownElement.contains(event.target as Node) 
        && profileElement && !profileElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}