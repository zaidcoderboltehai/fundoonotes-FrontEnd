import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service'; // UserService import
import { Router } from '@angular/router'; // Router import

@Component({
  selector: 'app-google-forget-password',
  standalone: false,
  templateUrl: './google-forget-password.component.html',
  styleUrls: ['./google-forget-password.component.scss'] // Note plural 'styleUrls'
})
export class GoogleForgetPasswordComponent {
  email: string = ''; // Email input variable

  constructor(
    private userService: UserService, // Inject UserService
    private router: Router           // Inject Router
  ) {}

  // Form submit handler
  onSubmit() {
    if (!this.email) {
      alert('Please enter your email address.');
      return;
    }

    // Forgot password API call
    this.userService.forgotPassword(this.email).subscribe({
      next: () => {
        alert('Check your email for reset instructions!');
        this.router.navigate(['/login']); // Redirect to login
      },
      error: (err) => {
        alert('Error: ' + (err.error?.error || 'Something went wrong. Please try again later.'));
      }
    });
  }
}
