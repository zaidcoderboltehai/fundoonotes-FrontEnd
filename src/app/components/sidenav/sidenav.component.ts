// sidenav.component.ts
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user/user.service";
import { SearchService } from "../../services/search.service"; // Import search service

// Angular + Material
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";

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
  ],
})
export class SidenavComponent {
  searchText = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private searchService: SearchService // Inject search service
  ) {}

  logout() {
    this.userService.logout();
    this.router.navigate(["/login"]);
  }

  onSearch() {
    // Delegate search to service
    this.searchService.updateSearch(this.searchText);
  }
}