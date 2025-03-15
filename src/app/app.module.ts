import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { GoogleLoginPageComponent } from './components/google-login-page/google-login-page.component';
import { GoogleRegisterPageComponent } from './components/google-register-page/google-register-page.component';
import { GoogleForgetPasswordComponent } from './components/google-forget-password/google-forget-password.component';
import { GoogleResetPasswordComponent } from './components/google-reset-password/google-reset-password.component';
import { WhatsChatCmpComponent } from './whats-chat/whats-chat-cmp.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleLoginPageComponent,
    GoogleRegisterPageComponent,
    GoogleForgetPasswordComponent,
    GoogleResetPasswordComponent,
    WhatsChatCmpComponent // declare the new chat component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
