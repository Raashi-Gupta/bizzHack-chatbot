import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- IMPORT THIS
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { BusinessSelectionService } from '../../common-service/business-selection.service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [FormsModule, DropdownModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isOpen = false;
  userName: string = '';
    private businessSubscription!: Subscription;
  isBusinessSelected: boolean = false;

  constructor(private businessService: BusinessSelectionService, private router: Router) { }

  ngOnInit(): void {
    const storedName = localStorage.getItem('user');
    if (storedName) {
      const user = JSON.parse(storedName);
      this.userName = user.firstName;
    }
    this.businessSubscription = this.businessService.selectedBusiness$.subscribe(business => {
      this.isBusinessSelected = !!business;
    });
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
  showMobileMenu = false;

  menuItems = [
    { label: 'Home', icon: 'pi pi-home', route: '/home' },
    { label: `Most Searched`, icon: 'pi pi-question-circle', route: '/most-searched', disabled: !this.isBusinessSelected },
  ]

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
