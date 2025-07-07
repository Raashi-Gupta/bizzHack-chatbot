import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  imports: [CommonModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})
export class HomeScreenComponent implements OnInit{

  
  //   operations = [
  //   { name: 'Operation 1', value: 'Ready', color: '#00CFE8' },
  //   { name: 'Operation 2', value: 'Running', color: '#FF9F43' },
  //   { name: 'Operation 3', value: 'Idle', color: '#9C27B0' },
  //   { name: 'Operation 4', value: 'Paused', color: '#607D8B' },
  //   { name: 'Operation 5', value: 'Completed', color: '#4CAF50' },
  //   { name: 'Operation 6', value: 'Failed', color: '#F44336' },
  // ];

  userName : string = 'User';
  constructor(private router: Router){}

  ngOnInit(): void {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userName = storedName;
    }
  }

  operations = [
  { name: 'Operation 1', value: 'Ready', color: '#00CFE8', icon: 'pi-sitemap',redirect:"/chat" },
  { name: 'Operation 2', value: 'Running', color: '#FF9F43', icon: 'pi-users',redirect:"/chat" },
  { name: 'Operation 3', value: 'Idle', color: '#9C27B0', icon: 'pi-receipt',redirect:"chat" },
  { name: 'Operation 4', value: 'Paused', color: '#607D8B', icon: 'pi-warehouse',redirect:"chat" },
  { name: 'Operation 5', value: 'Completed', color: '#4CAF50', icon: 'pi-twitch',redirect:"chat" },
  { name: 'Operation 6', value: 'Failed', color: '#F44336', icon: 'pi-truck',redirect:"chat" },
];

 navigateTo(path: string) {
    if (path) {
      this.router.navigate([path]);
    }
  }
}


