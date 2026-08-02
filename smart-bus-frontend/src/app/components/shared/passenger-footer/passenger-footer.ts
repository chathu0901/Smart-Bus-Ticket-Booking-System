import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-passenger-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './passenger-footer.html',
  styleUrls: ['./passenger-footer.css']
})
export class PassengerFooterComponent {
  currentYear: number = new Date().getFullYear();

  // Contact Form Model
  contactForm = {
    name: '',
    email: '',
    subject: 'Booking Assistance',
    message: ''
  };

  submitted: boolean = false;

  // Frontend-only submission simulation
  submitIssue(): void {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      this.submitted = true;
      this.contactForm = { name: '', email: '', subject: 'Booking Assistance', message: '' };

      setTimeout(() => {
        this.submitted = false;
      }, 5000);
    }
  }
}