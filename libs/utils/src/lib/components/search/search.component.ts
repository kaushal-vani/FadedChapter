import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product/product.interface';
import { ProductMock } from '../../mocks/product/product.mock';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'lib-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() searchQuery = '';
  products: Product[] = ProductMock;
  filteredProducts: Product[] = [];
  showSuggestions = false;
  isLoading = false;

  private searchSubject = new Subject<string>();

  constructor() {
    this.filteredProducts = [];
    this.searchSubject.pipe(debounceTime(300)).subscribe(query => this.performSearch(query));
  }

  searchProducts(): void {
    this.searchSubject.next(this.searchQuery);
  }

  private performSearch(query: string): void {
    this.isLoading = true;
    const trimmedQuery = query.toLowerCase().trim();
    this.showSuggestions = false;

    if (trimmedQuery.length < 2) {
      this.filteredProducts = [];
      this.isLoading = false;
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(trimmedQuery) ||
      product.color?.toLowerCase().includes(trimmedQuery) ||
      product.fitType?.toLowerCase().includes(trimmedQuery) ||
      product.productType?.toLowerCase().includes(trimmedQuery) ||
      product.category?.toLowerCase().includes(trimmedQuery) ||
      product.description?.toLowerCase().includes(trimmedQuery) ||
      product.composition?.toLowerCase().includes(trimmedQuery)
    );

    if (this.filteredProducts.length === 0) {
      this.showSuggestions = true;
    }

    this.isLoading = false;
  }

  getFallbackProducts(): Product[] {
    return this.products.slice(0, 2);
  }
}