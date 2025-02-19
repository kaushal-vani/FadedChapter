import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product/product.interface';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';

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

  constructor(private searchService: SearchService) { }

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
}