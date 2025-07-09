import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { businessList, operationList } from '../shared/operationList';
import { BusinessSelectionService } from '../common-service/business-selection.service';

@Component({
  selector: 'app-home-screen',
  imports: [CommonModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})
export class HomeScreenComponent implements OnInit{

  userName : string = 'User';
  constructor(private router: Router, private businessService: BusinessSelectionService){}

  ngOnInit(): void {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userName = storedName;
    }
  }
  business = businessList;
  operations = operationList;
 navigateTo(businessName: string) {
    this.businessService.setBusiness(businessName);
    this.router.navigate(['/chat']);
  }
}


