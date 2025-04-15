import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.scss"],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
})
export class DisplayComponent {
  // Inputs
  @Input() notes: any[] = [];
  @Input() isTrash: boolean = false;
  @Input() isGridView: boolean = true; // Added view mode input

  // Outputs
  @Output() archive = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() restore = new EventEmitter<any>();

  // Action methods
  toggleArchive(note: any): void {
    this.archive.emit(note);
  }

  toggleRestore(note: any): void {
    this.restore.emit(note);
  }

  deleteNote(note: any): void {
    this.delete.emit(note);
  }

  editNote(note: any): void {
    this.edit.emit(note);
  }
}