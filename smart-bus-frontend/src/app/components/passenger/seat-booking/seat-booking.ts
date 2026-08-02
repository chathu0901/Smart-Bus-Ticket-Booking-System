import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BusService } from '../../../services/bus';
import { NavbarComponent } from '../../shared/status-badge/navbar/navbar';

@Component({
  selector: 'app-seat-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './seat-booking.html'
})
export class SeatBookingComponent implements OnInit {
  scheduleId: number = 0;
  schedule: any = null;
  seats: number[] = [];
  selectedSeatNumber: number | null = null;
  selectedFile: File | null = null;
  
  // Intermediate Fare & Stops
  customFare: number | null = null;
  pickupStop: string | null = null;
  dropStop: string | null = null;

  isSubmitting = false;
  errorMessage = '';
  
  // Ticket Display State
  bookingSuccess = false;
  createdBooking: any = null;

  constructor(
    private route: ActivatedRoute,
    private busService: BusService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.scheduleId = Number(idParam);

    this.route.queryParams.subscribe(params => {
      if (params['fare']) this.customFare = parseFloat(params['fare']);
      if (params['pickup']) this.pickupStop = params['pickup'];
      if (params['drop']) this.dropStop = params['drop'];
    });

    this.loadScheduleDetails();
  }

  loadScheduleDetails(): void {
    this.busService.getSchedules().subscribe({
      next: (schedules: any[]) => {
        this.schedule = schedules.find(s => Number(s.id) === Number(this.scheduleId));
        const totalSeats = this.schedule?.bus?.total_seats || 40;
        this.seats = Array.from({ length: totalSeats }, (_, i) => i + 1);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching schedules:', err);
        this.errorMessage = 'Failed to load bus schedule.';
        this.seats = Array.from({ length: 40 }, (_, i) => i + 1);
        this.cdr.detectChanges();
      }
    });
  }

  selectSeat(seatNum: number): void {
    this.selectedSeatNumber = seatNum;
    this.errorMessage = '';
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  confirmBooking(): void {
    if (!this.selectedSeatNumber) {
      this.errorMessage = 'Please click on a seat grid number to select your seat!';
      return;
    }

    if (!this.selectedFile) {
      this.errorMessage = 'Please attach your payment receipt before submitting.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('schedule_id', this.scheduleId.toString());
    formData.append('seat_number', this.selectedSeatNumber.toString());
    formData.append('payment_receipt', this.selectedFile);

    if (this.customFare) {
      formData.append('fare', this.customFare.toString());
    }
    if (this.pickupStop) {
      formData.append('pickup_stop', this.pickupStop);
    }
    if (this.dropStop) {
      formData.append('drop_stop', this.dropStop);
    }

    this.busService.createBooking(formData).subscribe({
      next: (response: any) => {
        this.isSubmitting = false;
        this.bookingSuccess = true;
        this.createdBooking = response.booking || response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Error submitting booking.';
        this.cdr.detectChanges();
      }
    });
  }

  printTicket(): void {
    window.print();
  }
}