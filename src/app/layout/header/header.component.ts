import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- IMPORT THIS
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FormsModule, DropdownModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isOpen = false;
  userName: string = '';

  ngOnInit(): void {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userName = storedName;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    console.log('isOpen:', this.isOpen);
  }

  closeDropdown() {
    setTimeout(() => (this.isOpen = false), 200);
  }

  navigate(action: string) {
    console.log('Navigating to:', action);
    this.isOpen = false;
  }

}

