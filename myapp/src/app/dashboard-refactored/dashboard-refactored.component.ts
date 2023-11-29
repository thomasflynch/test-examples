import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DataItem } from '../models/data-item.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  data: DataItem[] = [];
  loading = false;
  error = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.dataService.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading data';
        this.loading = false;
      }
    });
  }
}