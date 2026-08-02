import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-footer.html',
  styleUrls: ['./admin-footer.css']
})
export class AdminFooterComponent {
  currentYear: number = new Date().getFullYear();

  // Emit the tab name to the parent AdminDashboardComponent
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tabName: string): void {
    this.tabChange.emit(tabName);
    // Scroll smoothly to top when switching tabs from footer
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}