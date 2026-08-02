import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BusService } from '../../../services/bus';
import { NavbarComponent } from '../../shared/navbar/navbar';

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
    const fromQuery = this.origin.trim().toLowerCase();
    const toQuery = this.destination.trim().toLowerCase();

    this.busService.getSchedules().subscribe(schedules => {
      this.filteredSchedules = schedules.filter((s: any) => {
        const route = s.route;
        if (!route) return false;

        // 1. Check Origin (Matches main start_location OR any intermediate stop)
        const isStartOrigin = route.start_location?.toLowerCase().includes(fromQuery);
        const originStop = route.stops?.find((stop: any) => 
          stop.stop_name?.toLowerCase().includes(fromQuery)
        );
        const matchesOrigin = !fromQuery || isStartOrigin || !!originStop;

        // 2. Check Destination (Matches main destination OR any intermediate stop)
        const isEndDestination = route.destination?.toLowerCase().includes(toQuery);
        const destStop = route.stops?.find((stop: any) => 
          stop.stop_name?.toLowerCase().includes(toQuery)
        );
        const matchesDest = !toQuery || isEndDestination || !!destStop;

        // If origin or destination doesn't match this route, reject it
        if (!matchesOrigin || !matchesDest) {
          return false;
        }

        // 3. Direction & Sequence Validation (If searching between two intermediate stops)
        if (fromQuery && toQuery && originStop && destStop) {
          // Reject if origin stop is after destination stop in order
          if (originStop.stop_order >= destStop.stop_order) {
            return false;
          }
        }

        // If origin is main start_location and dest is an intermediate stop, always valid
        // If origin is an intermediate stop and dest is main destination, always valid

        // 4. Date Filtering
        const matchesDate = !this.travelDate || (s.departure_time && s.departure_time.startsWith(this.travelDate));

        return matchesDate;
      });
    });
  }
}