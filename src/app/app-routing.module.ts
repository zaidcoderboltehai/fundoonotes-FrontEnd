import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleLoginPageComponent } from './components/google-login-page/google-login-page.component';
import { GoogleRegisterPageComponent } from './components/google-register-page/google-register-page.component';
import { GoogleForgetPasswordComponent } from './components/google-forget-password/google-forget-password.component';
import { GoogleResetPasswordComponent } from './components/google-reset-password/google-reset-password.component';
import { WhatsChatCmpComponent } from './whats-chat/whats-chat-cmp.component';

const routes: Routes = [
  { path: 'login', component: GoogleLoginPageComponent },
  { path: 'register', component: GoogleRegisterPageComponent },
  { path: 'forgot-password', component: GoogleForgetPasswordComponent },
  { path: 'reset-password', component: GoogleResetPasswordComponent },
  { path: 'whatsapp', component: WhatsChatCmpComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
