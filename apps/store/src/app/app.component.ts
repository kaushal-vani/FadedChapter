import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService, CookieConsentComponent, FooterComponent, GlobalNavComponent } from '@faded-chapter/shared';
import { ScrollService } from '@faded-chapter/utils';

@Component({
  imports: [GlobalNavComponent, RouterModule, CommonModule,FooterComponent, CookieConsentComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private scrollService: ScrollService, public authService: AuthService) { }
}