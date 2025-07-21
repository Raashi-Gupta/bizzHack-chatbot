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


@Component({
  selector: 'app-page-header',
  imports: [CommonModule, FormsModule, SelectModule,ButtonModule,Dialog,InputTextModule,FileUpload,TabViewModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle :string = '';
  operationOption = operationList
  selectedBusiness: string | null = null;
  visible: boolean = false;
  activeTabIndex: number = 0;
  uploadUrl: string = '';
  businessName: string = '';

  ngOnInit(): void {
    
    this.selectedBusiness = localStorage.getItem('selectedBusiness');
    // if(!this.selectedBusiness){
    //   // this.selectedBusiness =  this.operationOption[0].name;
    //   // localStorage.setItem("currentOperation",this.selectedBusiness);
    // }
  }



showDialog() {
  this.visible = true;
  this.activeTabIndex = 0;
}

onUploadFileSave() {
  console.log('File Upload triggered');
  this.visible = false;
}

onUploadUrlSave() {
  console.log('URL to upload:', this.uploadUrl);
  this.visible = false;
}
}
