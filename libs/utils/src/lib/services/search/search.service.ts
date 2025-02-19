import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductMock } from '../../mocks/product/product.mock';
import { Product } from '../../models/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private products: Product[] = ProductMock;
  private filteredProductsSubject = new BehaviorSubject<Product[]>([]);
  public filteredProducts$ = this.filteredProductsSubject.asObservable();

  searchProducts(query: string): void {
    const trimmedQuery = query.toLowerCase().trim();

    if (trimmedQuery.length < 2) {
      this.filteredProductsSubject.next([]);
      return;
    }

    this.filterProducts(trimmedQuery).subscribe(filteredProducts => {
      this.filteredProductsSubject.next(filteredProducts);
    });
  }

  private filterProducts(trimmedQuery: string): Observable<Product[]> {
    return of(this.products.filter(product =>
      product.name.toLowerCase().includes(trimmedQuery) ||
      product.color?.toLowerCase().includes(trimmedQuery) ||
      product.fitType?.toLowerCase().includes(trimmedQuery) ||
      product.productType?.toLowerCase().includes(trimmedQuery) ||
      product.category?.toLowerCase().includes(trimmedQuery) ||
      product.description?.toLowerCase().includes(trimmedQuery) ||
      product.composition?.toLowerCase().includes(trimmedQuery)
    ));
  }

  getFallbackProducts(): Product[] {
    return this.products.slice(0, 2);
  }
}
