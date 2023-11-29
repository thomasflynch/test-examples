import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  template: `
    <h1>Dashboard</h1>
    <div *ngFor="let item of data">
      {{ item.name }}
    </div>
    <button (click)="loadData()">Refresh Data</button>
  `
})
export class DashboardComponent {
  data: any[] = [];

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData() {
    this.http.get('https://api.example.com/data').subscribe((response: any) => {
      this.data = response.data;
    });
  }
}