import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrls.auth;
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  register(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap(tokens => {
        localStorage.setItem('access', tokens.accessToken);
        localStorage.setItem('refresh', tokens.refreshToken);
      }),
      switchMap(() => this.fetchCurrentUser())
    );
  }

  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-connected`).pipe(
      tap(user => this.currentUserSubject.next(user)),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refresh');
    return this.http.post<{ accessToken: string }>(
      `${this.apiUrl}/refresh`,
      { refreshToken }
    ).pipe(
      tap(response => {
        localStorage.setItem('access', response.accessToken);
      })
    );
  }
}
