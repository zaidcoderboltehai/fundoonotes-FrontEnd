// sidenav.component.ts
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user/user.service";
import { SearchService } from "../../services/search.service";

// Angular Material Modules
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu"; // Added for menu support

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    MatMenuModule // Added to the imports array
  ],
})
export class SidenavComponent {
  searchText = "";
  isGridView = true; // Controls grid/list view state

  constructor(
    private userService: UserService,
    private router: Router,
    private searchService: SearchService
  ) {}

  // Toggles between grid and list views
  toggleView() {
    this.isGridView = !this.isGridView;
    this.searchService.updateViewMode(this.isGridView);
  }

  // Handles user logout
  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.userService.logout();
      this.router.navigate(['/login']);
    }
  }

  // Updates search query
  onSearch() {
    this.searchService.updateSearch(this.searchText.trim());
  }
}