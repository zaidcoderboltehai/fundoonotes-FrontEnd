import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Main App Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Non-standalone Components
import { NotesComponent } from './components/notes/notes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArchiveComponent } from './components/archive/archive.component';

// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// Standalone Components (now properly imported)
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DisplayComponent } from './components/display/display.component';
import { GetAllNotesComponent } from './components/get-all-notes/get-all-notes.component';
import { TrashComponent } from './components/trash/trash.component';
import { GoogleRegisterPageComponent } from './components/google-register-page/google-register-page.component';
import { GoogleLoginPageComponent } from './components/google-login-page/google-login-page.component';
import { GoogleForgetPasswordComponent } from './components/google-forget-password/google-forget-password.component';
import { GoogleResetPasswordComponent } from './components/google-reset-password/google-reset-password.component';
import { WhatsChatCmpComponent } from './components/whats-chat/whats-chat-cmp.component';

@NgModule({
  declarations: [
    // Only non-standalone components
    AppComponent,
    NotesComponent,
    DashboardComponent,
    ArchiveComponent
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,

    // Angular Material Modules
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,

    // Standalone Components (moved here from declarations)
    SidenavComponent,
    DisplayComponent,
    GetAllNotesComponent,
    TrashComponent,
    GoogleRegisterPageComponent,
    GoogleLoginPageComponent,
    GoogleForgetPasswordComponent,
    GoogleResetPasswordComponent,
    WhatsChatCmpComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
