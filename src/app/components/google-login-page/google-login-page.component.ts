import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-google-login-page',
  templateUrl: './google-login-page.component.html',
  styleUrls: ['./google-login-page.component.scss'],
  standalone: false
})
export class GoogleLoginPageComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router // Inject Router
  ) {}

  onInputFocus(event: FocusEvent) {
    console.log('Input focused:', (event.target as HTMLInputElement).value);
  }

  onInputBlur(event: FocusEvent) {
    console.log('Input blurred:', (event.target as HTMLInputElement).value);
  }

  onSubmit() {
    this.userService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Login successful');
        // Navigate to dashboard on successful login
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Set error message
        this.errorMessage = err.message;
      }
    });
  }
}