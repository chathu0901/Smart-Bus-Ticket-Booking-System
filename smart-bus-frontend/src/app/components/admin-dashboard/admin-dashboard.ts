import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus';
import { AuthService } from '../../services/auth';
//import { StatusBadgeComponent } from '../shared/status-badge/status-badge';
import { TicketCardComponent } from '../shared/status-badge/ticket-card/ticket-card'; // Import reusable ticket card

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketCardComponent], // Added TicketCardComponent
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboardComponent implements OnInit {
  activeTab = 'buses';

  buses: any[] = [];
  routes: any[] = [];
  schedules: any[] = [];
  bookings: any[] = [];

  // Form Models
  newBus = { bus_number: '', bus_type: 'AC', total_seats: 40 };
  newRoute = { route_number: '', start_location: '', destination: '', distance_km: 0 };
  newStop = { route_id: '', stop_name: '', stop_order: 1 };
  newSchedule = { bus_id: '', route_id: '', departure_time: '', arrival_time: '', fare: 0 };

  constructor(
    private busService: BusService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.busService.getBuses().subscribe(data => this.buses = data);
    this.busService.getRoutes().subscribe(data => this.routes = data);
    this.busService.getSchedules().subscribe(data => this.schedules = data);
    this.busService.getBookings().subscribe(data => this.bookings = data);
  }

  // Bus CRUD
  addBus(): void {
    this.busService.createBus(this.newBus).subscribe(() => {
      this.newBus = { bus_number: '', bus_type: 'AC', total_seats: 40 };
      this.loadAllData();
    });
  }

  deleteBus(id: number): void {
    this.busService.deleteBus(id).subscribe(() => this.loadAllData());
  }

  // Route CRUD
  addRoute(): void {
    this.busService.createRoute(this.newRoute).subscribe(() => {
      this.newRoute = { route_number: '', start_location: '', destination: '', distance_km: 0 };
      this.loadAllData();
    });
  }

  deleteRoute(id: number): void {
    this.busService.deleteRoute(id).subscribe(() => this.loadAllData());
  }

  // Intermediate Stop
  addStop(): void {
    this.busService.addStop(this.newStop).subscribe(() => {
      this.newStop = { route_id: '', stop_name: '', stop_order: 1 };
      this.loadAllData();
    });
  }

  // Schedule CRUD
  addSchedule(): void {
    this.busService.createSchedule(this.newSchedule).subscribe(() => {
      this.newSchedule = { bus_id: '', route_id: '', departure_time: '', arrival_time: '', fare: 0 };
      this.loadAllData();
    });
  }

  deleteSchedule(id: number): void {
    this.busService.deleteSchedule(id).subscribe(() => this.loadAllData());
  }

  // Booking Status Approval
  updateBookingStatus(id: number, status: string): void {
    this.busService.updateBookingStatus(id, status).subscribe(() => this.loadAllData());
  }

  // Handle Event Emitted by <app-ticket-card>
  onTicketStatusChange(event: { id: number; status: string }): void {
    this.updateBookingStatus(event.id, event.status);
  }

  logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }
}