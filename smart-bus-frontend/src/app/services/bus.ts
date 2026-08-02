import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // Helper method to attach stored auth token
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      })
    };
  }

  // Buses
  getBuses(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/buses`, this.getAuthHeaders()); 
  }
  createBus(data: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/buses`, data, this.getAuthHeaders()); 
  }
  deleteBus(id: number): Observable<any> { 
    return this.http.delete(`${this.apiUrl}/buses/${id}`, this.getAuthHeaders()); 
  }

  // Routes & Stops
  getRoutes(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/bus-routes`); 
  }
  getRouteDetails(id: number): Observable<any> { 
    return this.http.get(`${this.apiUrl}/bus-routes/${id}`); 
  }
  createRoute(data: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/bus-routes`, data, this.getAuthHeaders()); 
  }
  deleteRoute(id: number): Observable<any> { 
    return this.http.delete(`${this.apiUrl}/bus-routes/${id}`, this.getAuthHeaders()); 
  }
  addStop(data: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/stops`, data, this.getAuthHeaders()); 
  }

  // Schedules
  getSchedules(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/schedules`); 
  }
  createSchedule(data: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/schedules`, data, this.getAuthHeaders()); 
  }
  deleteSchedule(id: number): Observable<any> { 
    return this.http.delete(`${this.apiUrl}/schedules/${id}`, this.getAuthHeaders()); 
  }

  // Bookings
  getBookings(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/bookings`, this.getAuthHeaders()); 
  }
  getMyBookings(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/my-bookings`, this.getAuthHeaders()); 
  }
  createBooking(formData: FormData): Observable<any> { 
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/bookings`, formData, { headers }); 
  }
  updateBookingStatus(id: number, status: string): Observable<any> { 
    return this.http.patch(`${this.apiUrl}/bookings/${id}/status`, { status }, this.getAuthHeaders()); 
  }
  cancelBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${id}`, this.getAuthHeaders());
  }
}