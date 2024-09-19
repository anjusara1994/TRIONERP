import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';
import { DropDownServiceService } from '../Services/drop-down-service.service';
import { AuthService } from '../Services/auth.service';


@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrl: 'layout.component.css'
  })
  export class LayoutComponent implements OnInit {
    user: any = {};
    menuData: any[] = [];
    groupedMenu: { [key: string]: any[] } = {}; 
    parentMenus: string[] = []; 
    EmpId: number = 1;
    isCollapsed = false;
    constructor(private router: Router,private dropDownService: DropDownServiceService,private authService: AuthService) {}
  
    ngOnInit(): void {
      this.loadUserData();
      this.loadMenu();
    }
  
    loadUserData(): void {
      this.user = this.authService.currentUserValue || {};
    }

    loadMenu(): void {
      this.dropDownService.getMenuDetails(this.EmpId)
        .subscribe(data => {
          this.menuData = data;
          this.buildMenu();
        });
    }

    buildMenu(): void {
      this.menuData.forEach(item => {
        if (!this.groupedMenu[item.PMenuName]) {
          this.groupedMenu[item.PMenuName] = [];
        }
        this.groupedMenu[item.PMenuName].push(item);
      });
      this.parentMenus = Object.keys(this.groupedMenu); // Get parent menu names
    }
  
  
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
      
    }
  }
  