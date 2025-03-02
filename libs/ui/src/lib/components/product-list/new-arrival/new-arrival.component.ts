import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { Product } from '@faded-chapter/utils';
import { ProductCardSkeletonLoaderComponent } from '@faded-chapter/shared';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-new-arrival',
  imports: [CommonModule,ProductCardSkeletonLoaderComponent,ProductCardComponent],
  templateUrl: './new-arrival.component.html',
  styleUrl: './new-arrival.component.scss',
})
export class NewArrivalComponent implements OnInit{
  newArrival : Product[] = []; 
  isLoading = true;
  skeletonCount = 0;

  constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.fetchNewArrival();
    }
  
    fetchNewArrival() {
      this.http.get<Product[]>('http://localhost:5001/api/products/new-arrivals').subscribe({
        next: (products) => {
          this.newArrival = products;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching best selling products:', error);
          this.isLoading = false;
        }
      });
    }
  }
