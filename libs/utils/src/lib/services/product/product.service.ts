import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductMock } from '../../mocks/product/product.mock';
import { Product } from '../../models/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProductById(id: string): Observable<Product> {
    const product = ProductMock.find(p => p.id === id);
    return this.handleProduct(product, 'id'); // Use a common handler
  }

  getProductBySlug(slug: string): Observable<Product> {
    const product = ProductMock.find(p => p.slug === slug);
    return this.handleProduct(product, 'slug'); // Use a common handler
  }

  private handleProduct(product: Product | undefined, identifierType: 'id' | 'slug'): Observable<Product> {
    if (product) {
      return of(product).pipe(delay(500)); // Simulate API call with delay
    } else {
      const errorMessage = identifierType === 'id' ? 'Product ID' : 'Product Slug';
      return throwError(() => new Error(`${errorMessage} not found`));
    }
  }
}