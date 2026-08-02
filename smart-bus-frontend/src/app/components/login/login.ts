import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        // 1. Explicitly save token & user details synchronously to localStorage first
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
        }

        // 2. Navigate based on role
        if (res.user?.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/passenger/dashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Invalid email or password.';
      }
    });
  }
}