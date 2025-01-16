import { Component, OnInit } from '@angular/core';
import fetchData from '../../../utils/fetchData';
import { Course } from '../../../utils/types';
import { ThemeService } from '../services/theme.service';
import { NgFor, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css'],
  imports:[NgIf,NgFor]
})
export class RecentComponent implements OnInit {
  courses: Course[] = [];
  userAvatar:string|null = localStorage.getItem('avatar');
  firstName:string|null = localStorage.getItem('firstName');
  lastName:string|null = localStorage.getItem('lastName');
  email:string|null = localStorage.getItem('email');
  isDark:boolean = false;
  userRole: string = '';
  isLoading:boolean = false;
  constructor(themeService:ThemeService,private cookieService:CookieService){
    this.isDark = themeService.checkIsDark()
  }
  ngOnInit(): void {
    this.isDark = !!localStorage.getItem('theme');
    this.fetchRecentCourses();
    this.fetchDashboardData()
  }

  async fetchRecentCourses(): Promise<void> {
    try {
      this.courses = await fetchData('/course/recent',"GET",undefined,undefined,(isLoading:boolean)=>isLoading);
    } catch (error) {
      console.error('Error fetching recent courses', error);
    }
  }
    async fetchDashboardData(): Promise<void> {
      try {
        const userData = await fetchData('/user/role', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
        this.userRole = userData.role;
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    }
  canModify(): boolean {
    return this.userRole === 'ADMIN';
  }
}
