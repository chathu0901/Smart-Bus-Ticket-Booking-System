import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BusService } from '../../services/bus';
import { AuthService } from '../../services/auth';
import { TicketCardComponent } from '../shared/ticket-card/ticket-card';
import { NavbarComponent } from '../shared/navbar/navbar';
import { PassengerFooterComponent } from '../shared/passenger-footer/passenger-footer';

@Component({
  selector: 'app-passenger-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink, 
    NavbarComponent, 
    TicketCardComponent,
    PassengerFooterComponent
  ],
  templateUrl: './passenger-dashboard.html'
})
export class PassengerDashboardComponent implements OnInit {
  userName = '';
  schedules: any[] = [];
  filteredSchedules: any[] = [];
  myBookings: any[] = [];
  bookingMessage = '';

  constructor(
    private busService: BusService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName() || 'Passenger';
    this.loadData();
  }

  loadData(): void {
    // Fetch Schedules
    this.busService.getSchedules().subscribe({
      next: (data) => {
        this.schedules = Array.isArray(data) ? [...data] : [];
        this.filteredSchedules = [...this.schedules];
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error fetching schedules:', err)
    });

    // Fetch My Bookings
    this.busService.getMyBookings().subscribe({
      next: (data) => {
        this.myBookings = Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching bookings:', err)
    });
  }

  cancelBooking(bookingId: number): void {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      this.busService.cancelBooking(bookingId).subscribe({
        next: () => {
          this.bookingMessage = 'Booking cancelled successfully.';
          this.loadData();
        },
        error: (err) => {
          console.error('Error cancelling booking:', err);
          this.bookingMessage = 'Failed to cancel booking.';
        }
      });
    }
  }

  filterSchedules(origin: string = '', destination: string = '', travelDate: string = ''): void {
    const fromQuery = origin.trim().toLowerCase();
    const toQuery = destination.trim().toLowerCase();

    this.filteredSchedules = this.schedules.filter((s: any) => {
      const route = s.route;
      if (!route) return false;

      const isStartOrigin = route.start_location?.toLowerCase().includes(fromQuery);
      const originStop = route.stops?.find((stop: any) => stop.stop_name?.toLowerCase().includes(fromQuery));
      const matchesOrigin = !fromQuery || isStartOrigin || !!originStop;

      const isEndDestination = route.destination?.toLowerCase().includes(toQuery);
      const destStop = route.stops?.find((stop: any) => stop.stop_name?.toLowerCase().includes(toQuery));
      const matchesDest = !toQuery || isEndDestination || !!destStop;

      if (!matchesOrigin || !matchesDest) return false;

      if (fromQuery && toQuery && originStop && destStop) {
        if (originStop.stop_order >= destStop.stop_order) return false;
      }

      const matchesDate = !travelDate || (s.departure_time && s.departure_time.startsWith(travelDate));
      return matchesDate;
    });
  }
}