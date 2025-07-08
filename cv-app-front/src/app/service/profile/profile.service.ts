import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../profile/models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8082/api/profiles';

  constructor(private http: HttpClient) {}

  getProfiles(firstName?: string, city?: string): Observable<Profile[]> {
    let params = new HttpParams();

    if (firstName && firstName.trim()) {
      params = params.set('firstName', firstName.trim());
    }

    if (city && city.trim()) {
      params = params.set('city', city.trim());
    }

    return this.http.get<Profile[]>(this.apiUrl, { params });
  }
}
