import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterRequest } from '@faded-chapter/utils';
import { AuthService } from '@faded-chapter/shared';

@Component({
  selector: 'lib-signup',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    this.isLoading = true;
    const userData: RegisterRequest = this.signupForm.value;

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert(response.message || 'Signup successful! Redirecting to login...');
        this.router.navigate(['/log-in']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message || 'Signup failed. Please try again.';
      }
    });
  }
}