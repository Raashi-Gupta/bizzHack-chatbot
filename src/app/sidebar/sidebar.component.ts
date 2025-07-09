import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BusinessSelectionService } from '../common-service/business-selection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  collapsed = false;
   private businessSubscription!: Subscription;
  isBusinessSelected: boolean = false;
  menuItems: any[] = [];

  constructor(private businessService: BusinessSelectionService) { }

  ngOnInit(): void {
    
    this.businessSubscription = this.businessService.selectedBusiness$.subscribe(business => {
      this.isBusinessSelected = !!business;
      this.updateMenuItems();
    });
  }

  updateMenuItems() {
    this.menuItems = [{ label: 'Home', icon: 'pi pi-home', route: '/home' },
    { label: `Most Searched`, icon: 'pi pi-question-circle', route: '/most-searched', disabled: !this.isBusinessSelected },
    { label: 'Upload a file', icon: 'pi pi-upload', route: '/upload', disabled: !this.isBusinessSelected },]
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  onMenuClick(item: any, event: MouseEvent) {
    if (item.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  ngOnDestroy(): void {
    this.businessSubscription?.unsubscribe();
  }
}
