import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {
  userData = { name: '', email: '', password: '' };
  errorMessage = '';
  validationErrors: any = {};
  isPasswordFocused = false;

  // Regex Patterns
  namePattern = '^[a-zA-Z\\s]{3,40}$';
  // Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  constructor(private authService: AuthService, private router: Router) {}

  // Password Requirement Helpers for UI Checklist
  hasMinLength(): boolean {
    return this.userData.password.length >= 8;
  }

  hasUpper(): boolean {
    return /[A-Z]/.test(this.userData.password);
  }

  hasLower(): boolean {
    return /[a-z]/.test(this.userData.password);
  }

  hasNumber(): boolean {
    return /\d/.test(this.userData.password);
  }

  hasSpecial(): boolean {
    return /[@$!%*?&]/.test(this.userData.password);
  }

  onRegister() {
    this.authService.register(this.userData).subscribe({
      next: () => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 422) {
          this.validationErrors = err.error.errors;
        } else {
          this.errorMessage = err.error?.message || 'Registration failed.';
        }
      }
    });
  }
}