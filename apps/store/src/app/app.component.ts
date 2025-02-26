import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from '@faded-chapter/pages';
import { CookieConsentComponent, FooterComponent, GlobalNavComponent } from '@faded-chapter/shared';
import { ScrollService } from '@faded-chapter/utils';

@Component({
  imports: [GlobalNavComponent, RouterModule, CommonModule,FooterComponent, CookieConsentComponent, AdminDashboardComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isAdminPage = true;
  constructor(private scrollService: ScrollService) { }
}