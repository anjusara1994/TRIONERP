import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any = {}; // To store user data
  isCollapsed = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    // You might want to fetch user data from a service or use local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      
      this.router.navigate(['/login']);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    
  }
}
