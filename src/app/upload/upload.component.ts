import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  selectedFiles: File[] = [];
  uploadedFiles: File[] = [];
  showSuccessMessage = false;

  onFileSelected(event: any): void {
    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  onUpload(): void {
    this.uploadedFiles = [...this.selectedFiles];
    this.selectedFiles = [];
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 5000);
  }
}
