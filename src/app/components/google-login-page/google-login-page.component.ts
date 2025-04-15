import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-google-login-page',
  templateUrl: './google-login-page.component.html',
  styleUrls: ['./google-login-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule 
  ]
})
export class GoogleLoginPageComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
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
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }
}