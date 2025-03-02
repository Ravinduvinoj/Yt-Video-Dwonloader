import { Component } from '@angular/core';
import { YtService } from '../service/yt.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrl: './downloader.component.css'
})
export class DownloaderComponent {
  youtubeUrl: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  // Validate YouTube URL format
  isValidYouTubeUrl(): boolean {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    return regex.test(this.youtubeUrl);
  }

  // Function to call backend for downloading the video
  downloadVideo() {
    if (this.isValidYouTubeUrl()) {
      this.http
        .post<{ message: string }>('http://localhost:3000/download', { url: this.youtubeUrl }, { responseType: 'blob' as 'json' })
        .subscribe(
          (response: any) => {
            const fileURL = URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = 'downloaded_video.mp4';
            link.click();
          },
          (error) => {
            this.errorMessage = 'There was an error downloading the video.';
          }
        );
    } else {
      this.errorMessage = 'Please enter a valid YouTube URL!';
    }
  }
}
