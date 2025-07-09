import { Component, Input, OnInit } from '@angular/core';
import { operationList } from '../shared/operationList';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-page-header',
  imports: [CommonModule, FormsModule, SelectModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle :string = '';
  operationOption = operationList
  currentOperation: string | null = null;
  ngOnInit(): void {
    
    this.currentOperation = localStorage.getItem('currentOperation');
    if(!this.currentOperation){
      this.currentOperation =  this.operationOption[0].name;
      localStorage.setItem("currentOperation",this.currentOperation);
    }
  }

  onOptionChange(event: any) {
    localStorage.setItem("currentOperation",event);
  }

}
