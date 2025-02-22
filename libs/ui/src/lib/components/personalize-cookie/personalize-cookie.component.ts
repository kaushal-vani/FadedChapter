import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieHandlerService } from '@faded-chapter/utils';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-personalize-cookie',
  imports: [CommonModule, FormsModule],
  templateUrl: './personalize-cookie.component.html',
  styleUrl: './personalize-cookie.component.scss',
})
export class PersonalizeCookieComponent implements OnInit {
  analyticsConsent = false;
  functionalConsent = false;
  marketingConsent = false;

  constructor(private cookieService: CookieHandlerService, private router: Router) {}

  ngOnInit(): void {
    this.analyticsConsent = this.cookieService.getCookie('analyticsConsent') === 'true';
    this.functionalConsent = this.cookieService.getCookie('functionalConsent') === 'true';
    this.marketingConsent = this.cookieService.getCookie('marketingConsent') === 'true';
  }

  savePreferences(): void {
    this.cookieService.setCookie('analyticsConsent', this.analyticsConsent ? 'true' : 'false', 365);
    this.cookieService.setCookie('functionalConsent', this.functionalConsent ? 'true' : 'false', 365);
    this.cookieService.setCookie('marketingConsent', this.marketingConsent ? 'true' : 'false', 365);
    console.log('Cookie preferences saved');
    this.router.navigate(['/']); // Navigate back to the main page
  }

  cancelPreferences(): void {
    this.router.navigate(['/home']); // Navigate back to the main page
  }
}