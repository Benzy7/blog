import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrls.user;

  constructor(private readonly http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.apiUrl}/`);
  }

  updateUserRole(userId: string, newRole: string) {
    return this.http.put(`${this.apiUrl}/${userId}/role`, { role: newRole });
  }
}
