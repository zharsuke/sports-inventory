import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {

  private baseUrl = 'http://localhost:8001/api';

  constructor(private http: HttpClient) { }

  getItems(endpoint: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/items`, { headers });
  }
}