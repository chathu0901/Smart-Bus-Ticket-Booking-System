import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus';
import { AuthService } from '../../services/auth';
import { TicketCardComponent } from '../shared/ticket-card/ticket-card';
import { AdminFooterComponent } from '../shared/admin-footer/admin-footer';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketCardComponent, AdminFooterComponent],
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
  newStop = { route_id: '', stop_name: '', stop_order: 1, distance_from_origin_km: 0};
  newSchedule = { bus_id: '', route_id: '', departure_time: '', arrival_time: '', fare: 0 };

  constructor(
    private busService: BusService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.busService.getBuses().subscribe({
      next: (data) => {
        this.buses = Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching buses:', err)
    });

    this.busService.getRoutes().subscribe({
      next: (data) => {
        const rawRoutes = Array.isArray(data) ? [...data] : [];

        // Deduplicate stops for each route before setting state
        this.routes = rawRoutes.map(route => {
          if (route.stops && Array.isArray(route.stops)) {
            const uniqueStops = route.stops.filter((stop: any, index: number, self: any[]) =>
              index === self.findIndex((s: any) => s.id === stop.id || (s.stop_name === stop.stop_name && s.stop_order === stop.stop_order))
            );
            return { ...route, stops: uniqueStops };
          }
          return route;
        });

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching routes:', err)
    });

    this.busService.getSchedules().subscribe({
      next: (data) => {
        this.schedules = Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching schedules:', err)
    });

    this.busService.getBookings().subscribe({
      next: (data) => {
        this.bookings = Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching bookings:', err)
    });
  }

  // Bus CRUD
  addBus(): void {
    this.busService.createBus(this.newBus).subscribe(() => {
      this.newBus = { bus_number: '', bus_type: 'AC', total_seats: 40 };
      this.loadAllData();
    });
  }

  deleteBus(id: number): void {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      this.busService.deleteBus(id).subscribe(() => this.loadAllData());
    }
  }

  // Route CRUD
  addRoute(): void {
    this.busService.createRoute(this.newRoute).subscribe(() => {
      this.newRoute = { route_number: '', start_location: '', destination: '', distance_km: 0 };
      this.loadAllData();
    });
  }

  deleteRoute(id: number): void {
    if (window.confirm('Are you sure you want to delete this route and all its stops?')) {
      this.busService.deleteRoute(id).subscribe(() => this.loadAllData());
    }
  }

  // Intermediate Stop
  addStop(): void {
    this.busService.addStop(this.newStop).subscribe({
      next: () => {
        // 1. Reset the form model back to default/empty values
        this.newStop = { 
          route_id: '', 
          stop_name: '', 
          stop_order: 1, 
          distance_from_origin_km: 0 
        };

        // 2. Reload the UI data to show the newly added stop
        this.loadAllData();
      },
      error: (err) => {
        console.error('Error adding stop:', err);
      }
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
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      this.busService.deleteSchedule(id).subscribe(() => this.loadAllData());
    }
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
    if (window.confirm('Are you sure you want to log out of the Admin Console?')) {
      this.authService.logout().subscribe({
        next: () => {
          localStorage.clear();
          this.router.navigate(['/login']);
        },
        error: () => {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      });
    }
  }
}