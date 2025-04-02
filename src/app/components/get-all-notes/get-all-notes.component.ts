import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user/user.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { DisplayComponent } from "../display/display.component";
import { CommonModule } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-get-all-notes",
  templateUrl: "./get-all-notes.component.html",
  styleUrls: ["./get-all-notes.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    DisplayComponent,
    MatTooltipModule
  ],
})
export class GetAllNotesComponent implements OnInit {
  loading = false;
  errorMessage = "";
  takeNoteExpanded = false;
  newNoteTitle = "";
  newNoteDesc = "";
  originalNotes: any[] = [];
  filteredNotes: any[] = [];
  searchSubscription!: Subscription;

  // Properties for editing
  isEditing = false;
  selectedNote: any = null;
  colors = [
    { code: '#ffffff', name: 'White' },
    { code: '#FF6347', name: 'Tomato' },
    { code: '#FF4500', name: 'Orange Red' },
    { code: '#FFFF00', name: 'Yellow' },
    { code: '#ADFF2F', name: 'Green Yellow' },
    { code: '#B0C4DE', name: 'Light Steel Blue' },
    { code: '#EEE8AA', name: 'Pale Golden Rod' },
    { code: '#7FFFD4', name: 'Aquamarine' },
    { code: '#FFE4C4', name: 'Bisque' },
    { code: '#C0C0C0', name: 'Silver' },
    { code: '#BC8F8F', name: 'Rosy Brown' },
    { code: '#D3D3D3', name: 'Grey' }
  ];
  selectedColor = '#ffffff';

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.fetchNotes();
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchSubscription = this.searchService.currentSearch.subscribe({
      next: (query) => {
        this.filteredNotes = this.filterNotes(query);
      },
      error: (err) => console.error('Search error:', err)
    });
  }

  private filterNotes(query: string): any[] {
    if (!query) return [...this.originalNotes];
    
    const lowerQuery = query.toLowerCase();
    return this.originalNotes.filter(note => {
      // Corrected property names to lowercase
      const titleMatch = note.title?.toLowerCase().includes(lowerQuery);
      const descMatch = note.description?.toLowerCase().includes(lowerQuery);
      return titleMatch || descMatch;
    });
  }

  fetchNotes(): void {
    this.loading = true;
    this.userService.getNotes().subscribe({
      next: (notes) => {
        this.originalNotes = notes;
        this.filteredNotes = [...notes];
        this.loading = false;
      },
      error: (err) => {
        this.handleError("Failed to load notes, please try again", err);
      }
    });
  }

  toggleTakeNote(): void {
    this.takeNoteExpanded = true;
  }

  closeNote(): void {
    if (this.newNoteTitle || this.newNoteDesc) {
      this.saveNewNote();
    } else {
      this.resetNoteForm();
    }
  }

  saveNewNote(): void {
    if (!this.newNoteTitle && !this.newNoteDesc) {
      this.resetNoteForm();
      return;
    }

    const noteAction = this.isEditing ? 
      this.userService.updateNote(this.selectedNote.id, this.prepareUpdatedNote()) :
      this.userService.createNote(this.prepareNewNote());

    this.loading = true;
    noteAction.subscribe({
      next: () => {
        this.fetchNotes();
        this.resetNoteForm();
      },
      error: (err) => {
        this.handleError(this.isEditing ? "Note update failed" : "Note creation failed", err);
      }
    });
  }

  private prepareUpdatedNote(): any {
    return {
      ...this.selectedNote,
      title: this.newNoteTitle,  // Changed to lowercase to match filter
      description: this.newNoteDesc,  // Changed to lowercase to match filter
      color: this.selectedNote.color || this.selectedColor  // Changed to lowercase
    };
  }

  private prepareNewNote(): any {
    return {
      title: this.newNoteTitle,  // Changed to lowercase
      description: this.newNoteDesc,  // Changed to lowercase
      color: this.selectedColor,  // Changed to lowercase
      labels: [],  // Changed to lowercase
    };
  }

  resetNoteForm(): void {
    this.newNoteTitle = "";
    this.newNoteDesc = "";
    this.takeNoteExpanded = false;
    this.isEditing = false;
    this.selectedNote = null;
    this.selectedColor = '#ffffff';
  }

  onArchiveNote(note: any): void {
    this.userService.archiveNote(note.id, !note.isArchived).subscribe({
      next: () => {
        this.fetchNotes();
        this.showSnackbar(`Note ${note.isArchived ? 'unarchived' : 'archived'}!`);
      },
      error: (err) => this.handleError('Failed to toggle archive', err)
    });
  }

  onEditNote(note: any): void {
    this.isEditing = true;
    this.selectedNote = note;
    this.newNoteTitle = note.title;  // Changed to lowercase
    this.newNoteDesc = note.description;  // Changed to lowercase
    this.selectedColor = note.color || '#ffffff';  // Changed to lowercase
    this.takeNoteExpanded = true;
  }

  onDeleteNote(note: any): void {
    this.userService.deleteNote(note.id).subscribe({
      next: () => {
        this.fetchNotes();
        this.showSnackbar('Note deleted!');
      },
      error: (err) => this.handleError('Note deletion failed', err)
    });
  }

  selectColor(colorCode: string): void {
    this.selectedColor = colorCode;
    if (this.isEditing && this.selectedNote) {
      this.selectedNote.color = colorCode;  // Changed to lowercase
    }
  }

  private handleError(message: string, error: any): void {
    this.errorMessage = message;
    this.loading = false;
    console.error(error);
    this.showSnackbar(message);
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', { 
      duration: 3000,
      panelClass: ['snackbar-style']
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}