import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BusService } from '../../../services/bus';
import { NavbarComponent } from '../../shared/status-badge/navbar/navbar';

@Component({
  selector: 'app-route-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './route-details.html'
})
export class RouteDetailsComponent implements OnInit {
  routeId: number = 0;
  routeData: any = null;

  // Fare Calculation State
  startStop: any = null;
  endStop: any = null;
  calculatedFare: number | null = null;
  ratePerKm: number = 15; // LKR per kilometer rate

  constructor(
    private route: ActivatedRoute,
    private busService: BusService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.routeId) {
      this.loadRouteDetails();
    }
  }

  loadRouteDetails(): void {
    this.busService.getRouteDetails(this.routeId).subscribe({
      next: (data) => {
        console.log('Route Details Received:', data);
        this.routeData = data;
        this.cdr.detectChanges(); // Force view update once data is set
      },
      error: (err) => {
        console.error('Error fetching route details:', err);
      }
    });
  }

  calculateIntermediateFare(): void {
    if (!this.startStop || !this.endStop) {
      this.calculatedFare = null;
      return;
    }

    const startDist = parseFloat(this.startStop.distance_from_origin_km || 0);
    const endDist = parseFloat(this.endStop.distance_from_origin_km || 0);

    const distance = Math.abs(endDist - startDist);
    this.calculatedFare = distance * this.ratePerKm;
  }
}