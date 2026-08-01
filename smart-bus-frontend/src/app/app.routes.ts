import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { PassengerDashboardComponent } from './components/passenger-dashboard/passenger-dashboard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'admin' } 
  },
  { 
    path: 'passenger/dashboard', 
    component: PassengerDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'passenger' } 
  },
  { path: '**', redirectTo: 'login' }
];