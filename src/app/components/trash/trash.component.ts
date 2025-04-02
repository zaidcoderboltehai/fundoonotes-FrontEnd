// trash.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from '../display/display.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';

// Material Modules
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DisplayComponent,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class TrashComponent implements OnInit, OnDestroy {
  trashedNotes: any[] = [];
  originalNotes: any[] = [];
  loading = false;
  private searchSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.loadTrashedNotes();
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchSubscription = this.searchService.currentSearch.subscribe({
      next: (query) => {
        this.trashedNotes = this.filterNotes(query);
      },
      error: (err) => console.error('Search error:', err)
    });
  }

  private filterNotes(query: string): any[] {
    if (!query) return [...this.originalNotes];
    const lowerQuery = query.toLowerCase();
    return this.originalNotes.filter(note => 
      // Corrected property names to lowercase
      note.title?.toLowerCase().includes(lowerQuery) || 
      note.description?.toLowerCase().includes(lowerQuery)
    );
  }

  loadTrashedNotes() {
    this.loading = true;
    this.userService.getTrashedNotes().subscribe({
      next: (notes) => {
        this.originalNotes = notes;
        this.trashedNotes = notes;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading notes:', err);
        this.loading = false;
        this.snackBar.open('Failed to load notes', 'Close', { duration: 3000 });
      }
    });
  }

  onDeletePermanently(note: any): void {
    if (confirm('Permanently delete this note?')) {
      this.userService.deleteNote(note.id).subscribe({
        next: () => {
          this.loadTrashedNotes();
          this.snackBar.open('Note deleted permanently', 'Close', { duration: 2000 });
        },
        error: (err) => {
          console.error('Delete failed:', err);
          this.snackBar.open('Deletion failed', 'Close', { duration: 3000 });
        }
      });
    }
  }

  onRestoreNote(note: any): void {
    this.userService.restoreNote(note.id).subscribe({
      next: () => {
        this.loadTrashedNotes();
        this.snackBar.open('Note restored!', 'Close', { 
          duration: 3000,
          panelClass: ['success-snackbar'] 
        });
      },
      error: (err) => {
        console.error('Restore failed:', err);
        this.snackBar.open('Restoration failed', 'Close', { 
          duration: 3000,
          panelClass: ['error-snackbar'] 
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}