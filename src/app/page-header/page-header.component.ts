import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { operationList } from '../shared/operationList';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

import { ToastModule } from 'primeng/toast';


export function multipleUrlsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const urls = value
      .split(/[\n,]+/)
      .map((u: string) => u.trim())
      .filter((u: string) => u.length > 0);

    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    const allValid = urls.every((url: string) => urlPattern.test(url));

    return allValid ? null : { invalidUrls: true };
  };
}

@Component({
  selector: 'app-page-header',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SelectModule, ButtonModule, Dialog, InputTextModule, FileUpload, TabViewModule, ProgressSpinner, Toast, ToastModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  providers: [MessageService]
})
export class PageHeaderComponent implements OnInit {
  @ViewChild('fu') fileUpload!: FileUpload;

  @Input() pageTitle: string = '';
  operationOption = operationList
  selectedBusiness: string | null = null;
  visible: boolean = false;
  activeTabIndex: number = 0;
  businessName: string = '';
  selectedFiles: File[] = [];
  namespace: any = '';
  dragActive: boolean = false;
  showLoader: boolean = false;
  uploading: boolean = false;
  uploadUrl = '';
  linkUrls: string[] = [];
  form!: FormGroup;
  addedUrls: string[] = [];
  uploadingUrls: boolean = false;
  isAdmin: boolean = false;



  constructor(private apiService: ApiCallService
    , private messageService: MessageService
    , private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      urlInput: ['', [multipleUrlsValidator()]]
    });
    this.namespace = localStorage.getItem('selectedBusiness')
    console.log(this.namespace);

    this.selectedBusiness = localStorage.getItem('selectedBusiness');
    const user = localStorage.getItem('user')
    if(user){
      const userDetail = JSON.parse(user);
      this.isAdmin = userDetail.role.toLowerCase() === 'admin'
    }
    // if(!this.selectedBusiness){
    //   // this.selectedBusiness =  this.operationOption[0].name;
    //   // localStorage.setItem("currentOperation",this.selectedBusiness);
    // }
  }

  //  ngAfterViewInit() {
  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Welcome',
  //     detail: 'This toast shows after view init!'
  //   });
  // }

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
    if (!this.namespace || this.selectedFiles.length === 0) return;

    this.showLoader = true;
    this.uploading = true;

    this.apiService.uploadFiles(this.namespace, this.selectedFiles).subscribe({
      next: (response) => {
        console.log('Upload success', response);
        this.showLoader = false;
        this.uploading = false;
        this.fileUpload.clear();
        this.selectedFiles = [];
        this.visible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Files uploaded successfully'
        });
      },
      error: (err) => {
        console.error('Upload failed', err);
        this.showLoader = false;
        this.uploading = false;
        this.fileUpload.clear();
        this.selectedFiles = [];
        this.visible = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'File upload failed'
        });
      },
    });
  }


  addUrls() {
    if (!this.form.value.urlInput) return;

    const rawUrls = this.form.value.urlInput
      .split(/[\s,]+/)
      .map((u: string) => u.trim())
      .filter((u: string) => u.length > 0);

    rawUrls.forEach((url: string) => {
      const trimmedUrl = url.trim();
      const normalizedUrl = trimmedUrl.toLowerCase();
      const alreadyAdded = this.addedUrls.some(existingUrl => existingUrl.toLowerCase() === normalizedUrl);

      if (!alreadyAdded) {
        this.addedUrls.push(trimmedUrl);
      }
    });

    this.form.patchValue({ urlInput: '' });
  }


  removeUrl(index: number) {
    this.addedUrls.splice(index, 1);
  }

  clearAll() {
    this.addedUrls = [];
  }

  submitUrls() {
    if (!this.namespace || this.addedUrls.length === 0) return;

    this.showLoader = true;
    this.uploadingUrls = true;

    this.apiService.uploadLinks(this.namespace, this.addedUrls).subscribe({
      next: () => {
        this.showLoader = false;
        this.visible = false;
        this.uploadingUrls = false;
        this.addedUrls = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'URL Data uploaded successfully'
        });
      },
      error: (err) => {
        console.error('Upload failed URL', err);
        this.showLoader = false;
        this.uploadingUrls = false;
        this.visible = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'URL upload failed'
        });
      }
    });
  }

}