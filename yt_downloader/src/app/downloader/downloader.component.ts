import { Component } from '@angular/core';
import { YtService } from '../service/yt.service';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrl: './downloader.component.css',
})
export class DownloaderComponent {
  youtubeUrl: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private apiServe: YtService) {}

  // Validate YouTube URL format
  isValidYouTubeUrl(): boolean {
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    return regex.test(this.youtubeUrl);
  }

  // Function to call backend for downloading the video
  downloadVideo() {
    if (this.isValidYouTubeUrl()) {
      this.isLoading = true;
      this.apiServe.downloadVideo(this.youtubeUrl).subscribe(
        (response: Blob) => {
          this.isLoading = false;
          const fileURL = URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = fileURL;
          link.download = 'downloaded_video.mp4'; // Specify the desired file name
          link.click();
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'There was an error downloading the video.';
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid YouTube URL!';
    }
  }
}
