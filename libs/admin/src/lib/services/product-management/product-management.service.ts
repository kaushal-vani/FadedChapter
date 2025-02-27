import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@faded-chapter/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  private apiUrl = 'http://localhost:5001/api/products'; // Change to your actual backend URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}