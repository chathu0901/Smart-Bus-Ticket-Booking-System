import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { PassengerDashboardComponent } from './components/passenger-dashboard/passenger-dashboard';
import { BusSearchComponent } from './components/passenger/bus-search/bus-search';
import { RouteDetailsComponent } from './components/passenger/route-details/route-details';
import { SeatBookingComponent } from './components/passenger/seat-booking/seat-booking';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Admin Routes
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'admin' } 
  },

  // Passenger Routes
  { 
    path: 'passenger/dashboard', 
    component: PassengerDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'passenger' } 
  },
  { 
    path: 'passenger/search', 
    component: BusSearchComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'passenger' } 
  },
  { 
    path: 'passenger/route/:id', 
    component: RouteDetailsComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'passenger' } 
  },
  { 
    path: 'passenger/book/:id', 
    component: SeatBookingComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'passenger' } 
  },
  { 
    path: 'passenger/bookings', 
    component: PassengerDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'passenger' } 
  },

  // Wildcard Route
  { path: '**', redirectTo: 'login' }
];