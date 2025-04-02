import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GoogleLoginPageComponent } from "./components/google-login-page/google-login-page.component";
import { GoogleRegisterPageComponent } from "./components/google-register-page/google-register-page.component";
import { GoogleForgetPasswordComponent } from "./components/google-forget-password/google-forget-password.component";
import { GoogleResetPasswordComponent } from "./components/google-reset-password/google-reset-password.component";
import { WhatsChatCmpComponent } from "./components/whats-chat/whats-chat-cmp.component";
import { GetAllNotesComponent } from "./components/get-all-notes/get-all-notes.component";
import { ArchiveComponent } from "./components/archive/archive.component";
import { TrashComponent } from "./components/trash/trash.component"; // ✅ Import TrashComponent
import { SidenavComponent } from "./components/sidenav/sidenav.component";

export const authGuard = () => !!localStorage.getItem('authToken');

const routes: Routes = [
  // Public routes
  { path: "login", component: GoogleLoginPageComponent },
  { path: "register", component: GoogleRegisterPageComponent },
  { path: "forgot-password", component: GoogleForgetPasswordComponent },
  { path: "reset-password/:token", component: GoogleResetPasswordComponent },
  
  // Feature route
  { path: "whatsapp", component: WhatsChatCmpComponent, canActivate: [authGuard] },

  // Protected dashboard routes
  {
    path: "dashboard",
    component: SidenavComponent,
    canActivate: [authGuard], // Auth guard for all child routes
    children: [
      { path: "", redirectTo: "notes", pathMatch: "full" },
      { path: "notes", component: GetAllNotesComponent },
      { path: "archive", component: ArchiveComponent },
      { path: "trash", component: TrashComponent } // ✅ Added Trash route
    ]
  },

  // Default redirects
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login" } // 404 handling
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}