import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-forget-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './google-forget-password.component.html',
  styleUrls: ['./google-forget-password.component.scss']
})
export class GoogleForgetPasswordComponent {
  email: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.email) {
      alert('Please enter your email address.');
      return;
    }

    this.userService.forgotPassword(this.email).subscribe({
      next: () => {
        alert('Check your email for reset instructions!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Error: ' + (err.error?.error || 'Something went wrong. Please try again later.'));
      }
    });
  }
}