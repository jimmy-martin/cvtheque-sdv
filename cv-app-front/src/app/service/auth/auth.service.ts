import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterPayload } from '../../auth/models/auth-register.model';
import { LoginPayload } from '../../auth/models/auth-login.model';
import { LoginResponse } from '../../auth/models/auth-response.model';
import { User } from '../../auth/models/user.model';

// Interface pour les informations utilisateur stockées dans le sessionStorage
export interface UserInfo {
  roles: string[];
  userId: number;
  sub: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL_AUTH = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) {}

  register(data: RegisterPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.API_URL_AUTH}/register`,
      data
    );
  }

  login(data: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL_AUTH}/login`, data);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL_AUTH}/me`);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userInfo');
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  decodeUserInfo(token: string): void {
    const payload = token.split('.')[1];
    if (!payload) {
      return;
    }

    const decodedPayload = atob(payload);
    try {
      const userInfo = JSON.parse(decodedPayload);
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      console.error('Error decoding user info:', error);
    }
  }

  /**
   * Récupère les informations utilisateur depuis le sessionStorage
   * Si les informations ne sont pas disponibles, les décode depuis le token
   * @returns UserInfo | null - Les informations utilisateur ou null si non authentifié
   */
  getUserInfo(): UserInfo | null {
    // Vérifier si l'utilisateur est authentifié
    if (!this.isAuthenticated()) {
      return null;
    }

    // Essayer de récupérer les informations depuis le sessionStorage
    const userInfoStr = sessionStorage.getItem('userInfo');
    if (userInfoStr) {
      try {
        return JSON.parse(userInfoStr) as UserInfo;
      } catch (error) {
        console.error('Error parsing user info from sessionStorage:', error);
      }
    }

    // Si les informations ne sont pas dans le sessionStorage, les décode depuis le token
    const token = this.getToken();
    if (token) {
      this.decodeUserInfo(token);
      const userInfoStr = sessionStorage.getItem('userInfo');
      if (userInfoStr) {
        try {
          return JSON.parse(userInfoStr) as UserInfo;
        } catch (error) {
          console.error('Error parsing decoded user info:', error);
        }
      }
    }

    return null;
  }

  /**
   * Récupère l'ID de l'utilisateur connecté
   * @returns number | null - L'ID de l'utilisateur ou null si non authentifié
   */
  getUserId(): number | null {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.userId : null;
  }

  /**
   * Récupère l'email de l'utilisateur connecté
   * @returns string | null - L'email de l'utilisateur ou null si non authentifié
   */
  getUserEmail(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.sub : null;
  }

  /**
   * Récupère les rôles de l'utilisateur connecté
   * @returns string[] | null - Les rôles de l'utilisateur ou null si non authentifié
   */
  getUserRoles(): string[] | null {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.roles : null;
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   * @param role - Le rôle à vérifier
   * @returns boolean - true si l'utilisateur a le rôle, false sinon
   */
  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles ? roles.includes(role) : false;
  }

  /**
   * Vérifie si l'utilisateur a au moins un des rôles spécifiés
   * @param roles - Les rôles à vérifier
   * @returns boolean - true si l'utilisateur a au moins un des rôles, false sinon
   */
  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getUserRoles();
    if (!userRoles) return false;
    return roles.some((role) => userRoles.includes(role));
  }
}
