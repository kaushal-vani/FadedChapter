import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent, ProductManagementComponent } from '@faded-chapter/admin';

@Component({
  selector: 'lib-admin-dashboard',
  imports: [CommonModule, AdminHeaderComponent,ProductManagementComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  recentOrders = [
    { id: 1, customer: 'John Doe', total: 120, status: 'Completed', date: '2025-02-25' },
    { id: 2, customer: 'Jane Smith', total: 90, status: 'Pending', date: '2025-02-24' },
    { id: 3, customer: 'Alice Brown', total: 150, status: 'Shipped', date: '2025-02-23' }
  ];
}