import { Component } from '@angular/core';

@Component({
  selector: 'app-google-login-page',
  templateUrl: './google-login-page.component.html',
  styleUrls: ['./google-login-page.component.scss'],
  standalone:false
})
export class GoogleLoginPageComponent {
  onInputFocus(event: FocusEvent) {
    console.log('Input focused:', (event.target as HTMLInputElement).value);
  }

  onInputBlur(event: FocusEvent) {
    console.log('Input blurred:', (event.target as HTMLInputElement).value);
  }
}
