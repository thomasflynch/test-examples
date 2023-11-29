import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        city: ['']
      })
    });
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getUser().subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading user';
        this.loading = false;
      }
    });
  }

  save() {
    if (this.userForm.valid) {
      this.userService.saveUser(this.userForm.value).subscribe({
        next: () => console.log('User saved'),
        error: (err) => this.error = 'Error saving user',
      });
    }
  }
}