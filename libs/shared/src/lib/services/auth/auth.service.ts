import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@faded-chapter/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/api/auth';

  private userSubject = new BehaviorSubject<LoginResponse | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, userData);
  }

  login(userData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, userData).pipe(
      tap((response) => {
        localStorage.setItem('authToken', response.authToken);
        localStorage.setItem('user', JSON.stringify(response));
        this.userSubject.next(response);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  isAdmin(): boolean {
    const user = this.userSubject.value;
    return !!user && !!user.isAdmin; // Check if user and isAdmin exist and are true
  }
}