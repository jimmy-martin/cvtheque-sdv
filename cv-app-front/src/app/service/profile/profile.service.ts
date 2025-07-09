import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../profile/models/profile.model';
import { CompleteProfilePayload } from '../../auth/models/auth-register.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly CV_API_URL = 'http://localhost:8082/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfiles(firstName?: string, city?: string): Observable<Profile[]> {
    let params = new HttpParams();

    if (firstName && firstName.trim()) {
      params = params.set('firstName', firstName.trim());
    }

    if (city && city.trim()) {
      params = params.set('city', city.trim());
    }

    return this.http.get<Profile[]>(`${this.CV_API_URL}/profiles`, { params });
  }

  getProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.CV_API_URL}/profiles/${id}`);
  }

  getMyProfile(): Observable<Profile> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Profile>(`http://localhost:8081/profiles/me`, {
      headers,
    });
  }

  updateProfile(profileData: CompleteProfilePayload): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.patch(`http://localhost:8081/profiles/me`, profileData, {
      headers,
    });
  }
}
