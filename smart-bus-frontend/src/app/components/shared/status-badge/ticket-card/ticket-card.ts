import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: './ticket-card.html'
})
export class TicketCardComponent {
  // Receives the booking object from parent components
  @Input({ required: true }) booking!: any;

  // Toggle admin-specific controls (Approve/Reject buttons & receipt link)
  @Input() isAdmin: boolean = false;

  // Outputs to emit events back to the parent component
  @Output() statusChange = new EventEmitter<{ id: number; status: string }>();

  approveBooking(): void {
    this.statusChange.emit({ id: this.booking.id, status: 'approved' });
  }

  rejectBooking(): void {
    this.statusChange.emit({ id: this.booking.id, status: 'rejected' });
  }
}