import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {
  private baseUrl = 'http://localhost:8001/api';

  constructor(private http: HttpClient) { }

  getItems(page: number = 1, limit: number = 10) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Add query params
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    return this.http.get(`${this.baseUrl}/items`, { headers, params });
  }
}