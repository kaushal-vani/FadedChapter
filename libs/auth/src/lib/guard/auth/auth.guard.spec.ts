import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AuthGuard } from './auth.guard'; // Correct path to your AuthGuard
import { AuthService } from '@faded-chapter/shared'; // Correct path to your AuthService
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])], // Use RouterModule for testing
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is authenticated', () => {
    (authService.isAuthenticated as jest.Mock).mockReturnValue(true); // Mocking the return value
    expect(authGuard.canActivate()).toBe(true);
  });

  it('should redirect to login if user is not authenticated', () => {
    (authService.isAuthenticated as jest.Mock).mockReturnValue(false); // Mocking the return value
    const navigateSpy = jest.spyOn(router, 'navigate'); // Spy on router.navigate
    expect(authGuard.canActivate()).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
