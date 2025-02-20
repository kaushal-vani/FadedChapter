import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product/product.interface';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @Input() searchQuery = '';
  filteredProducts: Product[] = [];
  showSuggestions = false;
  isLoading = false;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.searchService.filteredProducts$.subscribe(products => {
      this.filteredProducts = products;
      this.isLoading = false;
      this.showSuggestions = this.filteredProducts.length === 0 && this.searchQuery.length >= 2;
    });
  }

  searchProducts(): void {
    this.isLoading = true;
    this.searchService.searchProducts(this.searchQuery);
  }

  getFallbackProducts(): Product[] {
    return this.searchService.getFallbackProducts();
  }

  navigateToProduct(product: Product): void {
    if (product && product.slug) {
      this.router.navigate(['/product', product.slug]);
    } else if (product && product.id) {
       this.router.navigate(['/product', product.id]);
    } else {
      console.error("Product or slug/id is missing");
    }
    this.clearSearch(); // Clear search after navigation
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredProducts = [];
    this.showSuggestions = false;
    if (this.searchInput) {
      this.searchInput.nativeElement.blur();
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.searchInput && this.searchInput.nativeElement && !this.searchInput.nativeElement.contains(event.target)) {
      this.clearSearch();
    }
  }

  // Handle Enter key press on product card
  onProductCardEnter(product: Product): void {
    this.navigateToProduct(product);
  }
}