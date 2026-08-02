import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BusService } from '../../services/bus';
import { AuthService } from '../../services/auth';
//import { TicketCardComponent } from '../shared/status-badge/ticket-card/ticket-card';
import { NavbarComponent } from '../shared/status-badge/navbar/navbar';

@Component({
  selector: 'app-passenger-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './passenger-dashboard.html'
})
export class PassengerDashboardComponent implements OnInit {
  userName = '';
  schedules: any[] = [];
  myBookings: any[] = [];
  bookingMessage = '';

  constructor(
    private busService: BusService,
    private authService: AuthService,
    private router: Router,
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

  logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }
}