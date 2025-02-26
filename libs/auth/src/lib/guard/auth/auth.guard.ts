import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@faded-chapter/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // User is authenticated
    } else {
      // Pass the current route as the returnUrl query parameter
      this.router.navigate(['/log-in'], { queryParams: { returnUrl: this.router.url } });
      return false; // Deny access
    }
  }
}
