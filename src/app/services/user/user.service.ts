import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface User {
  name?: string;
  unique_name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = 'http://localhost:5256/api';

  constructor(private http: HttpClient, private router: Router) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCurrentUser(): User | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1])) as User;
    } catch (e) {
      console.error('Error parsing token:', e);
      return null;
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/User/login`, 
      { email, password }
    ).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/register`, userData).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/forgot-password`, { email }).pipe(
      catchError((error) => {
        console.error('Forgot password error:', error);
        return throwError(() => error);
      })
    );
  }

  resetPassword(email: string, token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/User/reset-password`, 
      { email, token, newPassword }
    ).pipe(
      catchError((error) => {
        console.error('Reset password error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/notes`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  createNote(note: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/notes`,
      note,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  updateNote(id: number, note: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/notes/${id}`,
      note,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/notes/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  // NEW PERMANENT DELETE METHOD
  deletePermanently(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/notes/${id}/permanent`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  archiveNote(id: number, archive: boolean = true): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/notes/${id}/archive?archive=${archive}`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  trashNote(id: number, trash: boolean = true): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/notes/${id}/trash?trash=${trash}`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  restoreNote(id: number): Observable<any> {
    return this.trashNote(id, false);
  }

  getArchivedNotes(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/notes/archived`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  getTrashedNotes(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/notes/trashed`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  addLabelToNote(noteId: number, labelId: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/notes/${noteId}/labels/${labelId}`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  removeLabelFromNote(noteId: number, labelId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/notes/${noteId}/labels/${labelId}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }
}