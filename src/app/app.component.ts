import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { filter } from 'rxjs';
import { HeaderComponent } from './layout/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent,HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'chatbot';
  showSidebar = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     const currentUrl = event.urlAfterRedirects;
    //     this.showSidebar = !this.isAuthRoute(currentUrl);
    //   });
  }

  private isAuthRoute(url: string): boolean {
    return ['/login'].some(authPath =>
      url.startsWith(authPath)
    );
  }

  get isLoggedIn(): boolean {
  return !!localStorage.getItem('userName');
}
}
