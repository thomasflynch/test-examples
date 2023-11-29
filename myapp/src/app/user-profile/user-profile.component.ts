import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  template: `
    <form [formGroup]="userForm">
      <h1>User Profile</h1>
      <div *ngIf="user; else noUserTemplate">
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Address: {{ user.address.street }}, {{ user.address.city }}</p>
        <button (click)="save()">Save</button>
      </div>
      <ng-template #noUserTemplate>
        <p>No user data available.</p>
      </ng-template>
</form>
  `,
  styles: [`
    div { font-family: Arial; }
    h1 { color: red; }
  `]
})
export class UserProfileComponent {
  user: any = null;

  constructor(private http: HttpClient) {
    this.http.get('https://api.example.com/user').subscribe(data => this.user = data);
  }

  save() {
    this.http.post('https://api.example.com/user/save', this.user).subscribe();
  }
}