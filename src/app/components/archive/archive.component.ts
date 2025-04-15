import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  standalone: false
})
export class ArchiveComponent implements OnInit, OnDestroy {
  originalNotes: any[] = [];
  filteredNotes: any[] = [];
  loading = false;
  errorMessage = '';
  searchSubscription!: Subscription;
  isGridView: boolean = true; // Added view mode state
  private viewModeSubscription!: Subscription; // Added for view mode

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.loadArchivedNotes();
    this.setupSearch();
    this.setupViewMode();
  }

  private setupSearch(): void {
    this.searchSubscription = this.searchService.currentSearch.subscribe({
      next: (query) => {
        this.filteredNotes = this.filterNotes(query);
      },
      error: (err) => console.error('Search error:', err)
    });
  }

  private setupViewMode(): void {
    this.viewModeSubscription = this.searchService.currentView.subscribe(
      isGrid => this.isGridView = isGrid
    );
  }

  private filterNotes(query: string): any[] {
    if (!query) return [...this.originalNotes];
    
    const lowerQuery = query.toLowerCase();
    return this.originalNotes.filter(note => {
      const titleMatch = note.title?.toLowerCase().includes(lowerQuery);
      const descMatch = note.description?.toLowerCase().includes(lowerQuery);
      return titleMatch || descMatch;
    });
  }

  loadArchivedNotes(): void {
    this.loading = true;
    this.userService.getArchivedNotes().subscribe({
      next: (notes) => {
        this.originalNotes = notes;
        this.filteredNotes = [...notes];
        this.loading = false;
      },
      error: (err) => {
        this.handleError("Failed to load archived notes. Please try again.", err);
      }
    });
  }

  onToggleArchive(note: any): void {
    this.userService.archiveNote(note.id, !note.isArchived).subscribe({
      next: () => {
        this.loadArchivedNotes();
        this.showSnackbar(`Note ${note.isArchived ? 'unarchived' : 'archived'}!`);
      },
      error: (err) => this.handleError('Failed to toggle archive status', err)
    });
  }

  onDeleteNote(note: any): void {
    if (confirm('Are you sure you want to delete this note permanently?')) {
      this.userService.deleteNote(note.id).subscribe({
        next: () => {
          this.loadArchivedNotes();
          this.showSnackbar('Note deleted permanently!');
        },
        error: (err) => this.handleError('Failed to delete note', err)
      });
    }
  }

  onEditNote(note: any): void {
    console.log('Edit note:', note);
    this.showSnackbar('Edit functionality not implemented yet');
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
    if (this.viewModeSubscription) {
      this.viewModeSubscription.unsubscribe();
    }
  }
}