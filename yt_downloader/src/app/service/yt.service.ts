import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class YtService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  downloadVideo(url: string): Observable<Blob> {
    return this.http.post<Blob>(
      this.baseUrl + 'download',
      { url },
      {
        responseType: 'blob' as 'json', // Ensure 'blob' is used for binary data
      }
    );
  }
}
