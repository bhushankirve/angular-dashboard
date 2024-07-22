import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/data.json';  // Path to your JSON file

  constructor(private http: HttpClient) {}

  getData(dateRange: string): Observable<any> {
    // Add any logic needed to handle different date ranges
    return this.http.get<any>(`${this.dataUrl}?dateRange=${dateRange}`);
  }
}
