import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusService } from '../../../services/bus';
import { TicketCardComponent } from '../../shared/ticket-card/ticket-card';
import { NavbarComponent } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    CommonModule, 
    TicketCardComponent, 
    NavbarComponent
  ],
  templateUrl: './my-bookings.html'
})
export class MyBookingsComponent implements OnInit {
  myBookings: any[] = [];

  constructor(
    private busService: BusService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMyBookings();
  }

  loadMyBookings(): void {
    this.busService.getMyBookings().subscribe({
      next: (data) => {
        this.myBookings = Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching my bookings:', err)
    });
  }

  cancelBooking(bookingId: number): void {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      this.busService.cancelBooking(bookingId).subscribe({
        next: () => {
          this.loadMyBookings();
        },
        error: (err) => console.error('Error cancelling booking:', err)
      });
    }
  }

  onTicketStatusChange(event: { id: number; status: string }): void {
    this.loadMyBookings();
  }
}