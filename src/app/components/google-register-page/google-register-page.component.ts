import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-google-register-page',
  standalone: false,
  templateUrl: './google-register-page.component.html',
  styleUrls: ['./google-register-page.component.scss'] // 'styleUrls' is plural
})
export class GoogleRegisterPageComponent {
  // Existing form fields
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  // New fields
  birthday: string = '';
  gender: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    this.userService.register({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      birthday: this.birthday,
      gender: this.gender
    }).subscribe({
      next: () => {
        // Registration Success
        this.router.navigate(['/login']); // Redirect to login
      },
      error: (err) => {
        this.errorMessage = err.message; // Set error message
      }
    });
  }
}
