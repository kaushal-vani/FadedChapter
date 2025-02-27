import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@faded-chapter/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const isAdminRoute = route.data['isAdmin']; // Get isAdmin flag from route data

      if (isAdminRoute && !this.authService.isAdmin()) {
        // If route requires admin and user is not admin, redirect
        this.router.navigate(['/store']); // Or whatever your customer route is
        return false;
      }

      return true; // User is authenticated and authorized
    } else {
      // Pass the current route as the returnUrl query parameter
      this.router.navigate(['/log-in'], { queryParams: { returnUrl: this.router.url } });
      return false; // Deny access
    }
  }
}