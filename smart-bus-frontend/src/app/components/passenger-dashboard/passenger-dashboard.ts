import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus';
import { AuthService } from '../../services/auth';
import { StatusBadgeComponent } from '../shared/status-badge/status-badge';
import { TicketCardComponent } from '../shared/status-badge/ticket-card/ticket-card'; // Import reusable ticket card

@Component({
  selector: 'app-passenger-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusBadgeComponent, TicketCardComponent], // Included TicketCardComponent
  templateUrl: './passenger-dashboard.html'
})
export class PassengerDashboardComponent implements OnInit {
  userName = '';
  schedules: any[] = [];
  myBookings: any[] = [];

  selectedSchedule: any = null;
  seatNumber = 1;
  selectedFile: File | null = null;
  bookingMessage = '';

  constructor(
    private busService: BusService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName() || 'Passenger';
    this.loadData();
  }

  loadData(): void {
    this.busService.getSchedules().subscribe(data => this.schedules = data);
    this.busService.getMyBookings().subscribe(data => this.myBookings = data);
  }

  selectSchedule(s: any): void {
    this.selectedSchedule = s;
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitBooking(): void {
    if (!this.selectedSchedule) return;

    const formData = new FormData();
    formData.append('schedule_id', this.selectedSchedule.id);
    formData.append('seat_number', this.seatNumber.toString());
    if (this.selectedFile) {
      formData.append('payment_receipt', this.selectedFile);
    }

    this.busService.createBooking(formData).subscribe({
      next: () => {
        this.bookingMessage = 'Booking submitted successfully! Pending admin verification.';
        this.selectedSchedule = null;
        this.selectedFile = null;
        this.loadData();
      },
      error: (err) => {
        this.bookingMessage = err.error?.message || 'Error creating booking.';
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }
}