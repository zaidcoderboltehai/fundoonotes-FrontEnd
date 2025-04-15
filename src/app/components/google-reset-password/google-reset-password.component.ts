import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-google-reset-password',
  templateUrl: './google-reset-password.component.html',
  styleUrls: ['./google-reset-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class GoogleResetPasswordComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.token = this.route.snapshot.params['token'];
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

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