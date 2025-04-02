// search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  
  // Optimized observable with debounce and duplicate checking
  currentSearch = this.searchSubject.asObservable().pipe(
    debounceTime(300),       // Wait 300ms after keystroke
    distinctUntilChanged()   // Ignore same consecutive values
  );

  updateSearch(query: string) {
    // Clean up query before sending
    const cleanQuery = query.trim().toLowerCase();
    this.searchSubject.next(cleanQuery);
  }
}