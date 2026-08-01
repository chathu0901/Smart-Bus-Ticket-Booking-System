import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // Buses
  getBuses(): Observable<any> { return this.http.get(`${this.apiUrl}/buses`); }
  createBus(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/buses`, data); }
  deleteBus(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/buses/${id}`); }

  // Routes & Stops
  getRoutes(): Observable<any> { return this.http.get(`${this.apiUrl}/bus-routes`); }
  createRoute(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/bus-routes`, data); }
  deleteRoute(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/bus-routes/${id}`); }
  addStop(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/stops`, data); }

  // Schedules
  getSchedules(): Observable<any> { return this.http.get(`${this.apiUrl}/schedules`); }
  createSchedule(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/schedules`, data); }
  deleteSchedule(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/schedules/${id}`); }

  // Bookings
  getBookings(): Observable<any> { return this.http.get(`${this.apiUrl}/bookings`); }
  getMyBookings(): Observable<any> { return this.http.get(`${this.apiUrl}/my-bookings`); }
  createBooking(formData: FormData): Observable<any> { return this.http.post(`${this.apiUrl}/bookings`, formData); }
  updateBookingStatus(id: number, status: string): Observable<any> { 
    return this.http.patch(`${this.apiUrl}/bookings/${id}/status`, { status }); 
  }
}