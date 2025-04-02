import type { Routes } from "@angular/router";

export const serverRoutes: Routes = [
  {
    path: "**",
    redirectTo: "/login", // 
    pathMatch: "full"
  }
];