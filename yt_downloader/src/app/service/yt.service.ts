import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YtService {
  private downloadUrl = 'http://localhost:3000/download'; // Your backend URL

  constructor(private http: HttpClient) { }

  downloadVideo(url: string): Observable<any> {
    return this.http.post<any>(this.downloadUrl, { url }, { responseType: 'blob' as 'json' });
  }
}
