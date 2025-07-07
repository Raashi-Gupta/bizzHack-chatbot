import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  collapsed = false;
  menuItems = [
    { label: 'Home', icon: 'pi pi-home', route: '/home' },
    { label: 'Chat', icon: 'pi pi-comments', route: '/chat' },
    { label: `Most Searched`, icon: 'pi pi-question-circle', route: '/most-searched' },
    { label: 'Upload a file', icon: 'pi pi-upload', route: '/upload' },
  ];

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
