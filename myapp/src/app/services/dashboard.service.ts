import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataItem } from '../models/data-item.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'https://api.example.com/data';

  constructor(private http: HttpClient) {}

  getData(): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(this.apiUrl);
  }
}