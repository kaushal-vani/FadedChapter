import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieHandlerService } from '@faded-chapter/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-cookie-consent',
  imports: [CommonModule],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
})
export class CookieConsentComponent implements OnInit {
  showConsent = false;
  consentGiven = false;

  constructor(
    private cookieService: CookieHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.consentGiven = this.cookieService.checkCookie('cookieConsent');
    if (!this.consentGiven) {
      setTimeout(() => {
        this.showConsent = true;
      }, 4000);
    }
  }

  acceptAll(): void {
    this.cookieService.setCookie('cookieConsent', 'true', 365);
    this.cookieService.setCookie('analyticsConsent', 'true', 365);
    this.cookieService.setCookie('functionalConsent', 'true', 365);
    this.cookieService.setCookie('marketingConsent', 'true', 365);
    this.consentGiven = true;
    this.showConsent = false;
    this.applyCookies();
  }

  acceptRequired(): void {
    this.cookieService.setCookie('cookieConsent', 'true', 365);
    this.consentGiven = true;
    this.showConsent = false;
    this.applyCookies();
  }

  personalizeChoices(): void {
    this.router.navigate(['personalize-cookie']);
    this.showConsent = false;
  }

  continueWithoutAccepting(): void {
    this.cookieService.setCookie('cookieConsent', 'true', 365);
    this.consentGiven = true;
    this.showConsent = false;
  }

  applyCookies(): void {
    if (this.cookieService.getCookie('analyticsConsent') === 'true') {
      console.log('analytics cookies set');
    }

    if (this.cookieService.getCookie('functionalConsent') === 'true') {
      console.log('functional cookies set');
    }

    if (this.cookieService.getCookie('marketingConsent') === 'true') {
      console.log('marketing cookies set');
    }
  }
}
