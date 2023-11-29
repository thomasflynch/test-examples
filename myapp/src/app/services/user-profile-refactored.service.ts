import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://api.example.com/user';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUserProfile(userId: number, updateData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updateData);
  }
}