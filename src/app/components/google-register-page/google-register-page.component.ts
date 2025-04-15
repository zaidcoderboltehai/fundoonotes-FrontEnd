import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-google-register-page',
  standalone: true,
  templateUrl: './google-register-page.component.html',
  styleUrls: ['./google-register-page.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class GoogleRegisterPageComponent {
  // Form field values
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  birthday: string = '';
  gender: string = '';

  // State management
  errorMessage: string = '';
  isLoading: boolean = false;
  minBirthDate: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    // Set minimum birth date (13 years ago from today)
    const today = new Date();
    this.minBirthDate = new Date(
      today.getFullYear() - 13,
      today.getMonth(),
      today.getDate()
    ).toISOString().split('T')[0];
  }

  onSubmit(form: any): void {
    if (this.isLoading || form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const registrationData = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password,
      birthday: this.birthday,
      gender: this.gender
    };

    if (!this.isValidBirthDate(registrationData.birthday)) {
      this.errorMessage = 'You must be at least 13 years old to register';
      this.isLoading = false;
      return;
    }

    this.userService.register(registrationData).subscribe({
      next: () => this.handleRegistrationSuccess(),
      error: (err) => this.handleRegistrationError(err),
      complete: () => this.isLoading = false
    });
  }

  private handleRegistrationSuccess(): void {
    this.router.navigate(['/login'], {
      queryParams: { registered: true },
      state: { email: this.email }
    });
  }

  private handleRegistrationError(err: any): void {
    this.isLoading = false;
    
    if (err.status === 409) {
      this.errorMessage = 'This email is already registered. Try signing in.';
    } else if (err.status === 400) {
      this.errorMessage = 'Invalid registration data. Please check your details.';
    } else {
      this.errorMessage = 'Registration failed. Please try again later.';
    }
  }

  private isValidBirthDate(birthday: string): boolean {
    return !!birthday && new Date(birthday) <= new Date(this.minBirthDate);
  }

  private calculateAge(): number {
    if (!this.birthday) return 0;
    const birthDate = new Date(this.birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    return (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) 
      ? age - 1 
      : age;
  }
}