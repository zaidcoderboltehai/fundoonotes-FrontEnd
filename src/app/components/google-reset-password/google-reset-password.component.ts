import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-google-reset-password',
  standalone: false,
  templateUrl: './google-reset-password.component.html',
  styleUrls: ['./google-reset-password.component.scss'] // 'styleUrls' is plural
})
export class GoogleResetPasswordComponent {
  // ngModel bindings
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  // Token from URL param
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    // Extract 'token' param from the URL (e.g. /reset-password/:token)
    this.token = this.route.snapshot.params['token'];
  }

  onSubmit(): void {
    // Check password match
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Call resetPassword method on userService
    this.userService.resetPassword(this.email, this.token, this.newPassword)
      .subscribe({
        next: () => {
          alert('Password reset successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          const msg = err.error?.error || 'Something went wrong. Please try again.';
          alert('Error: ' + msg);
        }
      });
  }
}
