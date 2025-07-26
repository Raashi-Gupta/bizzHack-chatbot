import { Component, Input, OnInit } from '@angular/core';
import { operationList } from '../shared/operationList';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FileUpload } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { ApiCallService } from '../api-call.service';
import { HttpEventType } from '@angular/common/http';
import { ProgressSpinner } from "primeng/progressspinner";


@Component({
  selector: 'app-page-header',
  imports: [CommonModule, FormsModule, SelectModule, ButtonModule, Dialog, InputTextModule, FileUpload, TabViewModule, ProgressSpinner],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle :string = '';
  operationOption = operationList
  selectedBusiness: string | null = null;
  visible: boolean = false;
  activeTabIndex: number = 0;
  uploadUrl: string[] = [];
  businessName: string = '';
  selectedFiles: File[] = [];
  namespace: any = '';
  dragActive: boolean = false;
linkUrls: string[] = [];
  showLoader: boolean = false;


  constructor(private apiService: ApiCallService)
  {}

  ngOnInit(): void {
    
    this.namespace =  localStorage.getItem('selectedBusiness')
    console.log(this.namespace);
    
    this.selectedBusiness = localStorage.getItem('selectedBusiness');
    // if(!this.selectedBusiness){
    //   // this.selectedBusiness =  this.operationOption[0].name;
    //   // localStorage.setItem("currentOperation",this.selectedBusiness);
    // }
  }

    onFileSelect(event: any) {
    this.selectedFiles = Array.from(event.files || []);
  }


    onClear() {
    this.dragActive = false;
  }

showDialog() {
  this.visible = true;
  this.activeTabIndex = 0;
}

onUploadFileSave() {
  debugger
  if (!this.namespace || this.selectedFiles.length === 0) return;

  this.showLoader = true;

  this.apiService.uploadFiles(this.namespace, this.selectedFiles).subscribe({
    next: (response) => {
      console.log('Upload success', response);
      this.showLoader = false;
      this.visible = false; // Close dialog
    },
    error: (err) => {
      console.error('Upload failed', err);
      this.showLoader = false;
      this.visible = false; // Close dialog
    },
  });
}

removeUrl(index: number): void {
  this.linkUrls.splice(index, 1);
}


onUploadUrlSave() {
  console.log('URL Upload triggered:', this.uploadUrl);

  if (!this.namespace || !this.uploadUrl) return;

  this.showLoader = true;

  this.apiService.uploadLinks(this.namespace, this.uploadUrl).subscribe({
    next: (res) => {
      console.log('Link upload successful', res);
      this.showLoader = false;
      this.visible = false;
    },
    error: (err) => {
      console.error('Link upload failed', err);
      this.showLoader = false;
      this.visible = false;
    }
  });
}


}
