import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  selectedFiles: File[] = [];
  uploadedFiles: File[] = [];

  onFileSelected(event: any): void {
    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  onUpload(): void {
    this.uploadedFiles = [...this.selectedFiles];
    this.selectedFiles = [];

    console.log('Files uploaded temporarily:', this.uploadedFiles);
  }
}
