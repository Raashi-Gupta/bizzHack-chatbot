import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { operationList } from '../shared/operationList';

@Component({
  selector: 'app-home-screen',
  imports: [CommonModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})
export class HomeScreenComponent implements OnInit{

  userName : string = 'User';
  constructor(private router: Router){}

  ngOnInit(): void {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userName = storedName;
    }
  }

  operations = operationList;
 navigateTo(path: string) {
    if (path) {
      this.router.navigate([path]);
    }
  }
}


