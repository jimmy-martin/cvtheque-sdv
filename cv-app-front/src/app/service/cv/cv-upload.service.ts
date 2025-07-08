import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private apiUrl = 'http://localhost:8082/api/cvs';

  constructor(private http: HttpClient) {}

  uploadCV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('profileId', '1');

    return this.http.post(`${this.apiUrl}/upload`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
