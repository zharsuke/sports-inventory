import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) { }

  getData(endpoint: string) {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

}