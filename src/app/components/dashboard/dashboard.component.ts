import { Component } from "@angular/core"
import  { Router } from "@angular/router" // Changed from type-only import
import  { UserService } from "../../services/user/user.service" // Changed from type-only import

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: false,
})
export class DashboardComponent {
  userName = "" // Initialize with empty string

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    const userData = this.userService.getCurrentUser()
    // Updated line: fallback to userData?.unique_name if userData?.name is missing
    this.userName = userData?.name || userData?.unique_name || "Guest"
  }

  logout() {
    localStorage.removeItem("authToken")
    this.router.navigate(["/login"])
  }
}