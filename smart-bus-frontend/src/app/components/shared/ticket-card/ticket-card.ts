import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: './ticket-card.html',
  styleUrls: ['./ticket-card.css']
})
export class TicketCardComponent {
  @Input({ required: true }) booking!: any;
  @Input() isAdmin: boolean = false;

  @Output() statusChange = new EventEmitter<{ id: number; status: string }>();

  // Controls ticket view modal state
  showModal: boolean = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  getReceiptUrl(path: string): string {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    const backendUrl = 'http://localhost:8000';
    const cleanPath = path.startsWith('/') ? path : '/' + path;

    return `${backendUrl}/storage${cleanPath}`;
  }

  approveBooking(): void {
    this.statusChange.emit({ id: this.booking.id, status: 'approved' });
  }

  rejectBooking(): void {
    this.statusChange.emit({ id: this.booking.id, status: 'rejected' });
  }

  printTicket(): void {
    window.print();
  }
}