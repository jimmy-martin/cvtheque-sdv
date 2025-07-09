import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterPayload } from '../../auth/models/auth-register.model';
import { LoginPayload } from '../../auth/models/auth-login.model';
import { LoginResponse } from '../../auth/models/auth-response.model';
import { User } from '../../auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL_AUTH = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) { }

  register(data: RegisterPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL_AUTH}/register`, data);
  }

  login(data: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL_AUTH}/login`, data);
  }


  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL_AUTH}/me`);
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
