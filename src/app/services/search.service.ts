// search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  private viewModeSubject = new BehaviorSubject<boolean>(true);

  // Search functionality
  currentSearch = this.searchSubject.asObservable().pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  // View mode functionality
  currentView = this.viewModeSubject.asObservable();

  updateSearch(query: string) {
    const cleanQuery = query.trim().toLowerCase();
    this.searchSubject.next(cleanQuery);
  }

  updateViewMode(isGrid: boolean) {
    this.viewModeSubject.next(isGrid);
  }
}