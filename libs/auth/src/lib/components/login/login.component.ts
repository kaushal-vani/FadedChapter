import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@faded-chapter/shared';
import { LoginRequest, LoginResponse } from '@faded-chapter/utils';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports:[CommonModule,ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials.';
      return;
    }

    this.isLoading = true;
    const loginData: LoginRequest = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        this.isLoading = false;
        localStorage.setItem('token', response.token); // Store token for authentication
        this.router.navigate(['/']); // Redirect to home or dashboard
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message || 'Login failed. Please try again.';
      },
    });
  }
}
