import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieHandlerService {
  constructor(private cookieService: CookieService) {}

  setCookie(name: string, value: string, daysToExpire = 365): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + daysToExpire);
    this.cookieService.set(name, value, expires);
  }

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  deleteCookie(name: string): void {
    this.cookieService.delete(name);
  }

  deleteAllCookies(): void {
    this.cookieService.deleteAll();
  }

  checkCookie(name: string) : boolean {
    return this.cookieService.check(name);
  }
}