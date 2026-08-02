import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BusService } from '../../../services/bus';
import { NavbarComponent } from '../../shared/status-badge/navbar/navbar';

@Component({
  selector: 'app-bus-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './bus-search.html'
})
export class BusSearchComponent implements OnInit {
  origin = '';
  destination = '';
  travelDate = '';
  
  routes: any[] = [];
  filteredSchedules: any[] = [];
  hasSearched = false;

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.busService.getRoutes().subscribe(data => this.routes = data);
  }

  onSearch(): void {
    this.hasSearched = true;
    this.busService.getSchedules().subscribe(schedules => {
      this.filteredSchedules = schedules.filter((s: any) => {
        const matchesOrigin = !this.origin || s.route?.start_location.toLowerCase().includes(this.origin.toLowerCase());
        const matchesDest = !this.destination || s.route?.destination.toLowerCase().includes(this.destination.toLowerCase());
        const matchesDate = !this.travelDate || s.departure_time.startsWith(this.travelDate);
        return matchesOrigin && matchesDest && matchesDate;
      });
    });
  }
}