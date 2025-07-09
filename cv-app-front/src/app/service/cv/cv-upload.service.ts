import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private readonly AUTH_API_URL = 'http://localhost:8081/auth';
  private readonly CV_API_URL = 'http://localhost:8082/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfiles(firstName?: string, city?: string): Observable<any[]> {
    let params = new HttpParams();

    if (firstName && firstName.trim()) {
      params = params.set('firstName', firstName.trim());
    }

    if (city && city.trim()) {
      params = params.set('city', city.trim());
    }

    return this.http.get<any[]>(`${this.CV_API_URL}/profiles`, { params });
  }

  getProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.CV_API_URL}/profiles/${id}`);
  }

  getMyProfile(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.AUTH_API_URL}/profiles/me`, { headers });
  }

  updateProfile(profileData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.patch(`${this.AUTH_API_URL}/profiles/me`, profileData, {
      headers,
    });
  }

  uploadCV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Récupérer l'ID utilisateur depuis le sessionStorage
    const userId = this.authService.getUserId();
    if (!userId) {
      return throwError(() => new Error('Utilisateur non authentifié'));
    }

    formData.append('userId', userId.toString());

    return this.http.post(`${this.CV_API_URL}/cvs/upload`, formData).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
}
