import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, CookieConsentComponent, FooterComponent, GlobalNavComponent } from '@faded-chapter/shared';
import { ScrollService } from '@faded-chapter/utils';

@Component({
  imports: [GlobalNavComponent, RouterModule, CommonModule,FooterComponent, CookieConsentComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router,private scrollService: ScrollService,) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.router.url]);
    }
    if(this.authService.isAuthenticated()){
      this.authService.logout(); 
      this.router.navigate(['/login']);
    }
  }
}