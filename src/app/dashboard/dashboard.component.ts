import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import fetchData from '../../../utils/fetchData';
import { CookieService } from 'ngx-cookie-service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NgClass,NgIf]
})
export class DashboardComponent implements OnInit {
  coursesCount: number = 0;
  usersCount: number = 0;
  completedCoursesCount: number = 0;
  timeSchedulesCount: number = 0;
  userRole: string = '';
  userAvatar: string | null = localStorage.getItem('avatar');
  firstName: string | null = localStorage.getItem('firstName');
  lastName: string | null = localStorage.getItem('lastName');
  email: string | null = localStorage.getItem('email');
  isDark: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  router:Router = new Router();
  constructor(private themeService: ThemeService, private cookieService: CookieService) {
    this.isDark = themeService.checkIsDark();
  }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  async fetchDashboardData(): Promise<void> {
    try {
      const userData = await fetchData('/user/users', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.userRole = userData.role;

      const [coursesData, completedCoursesData, timeSchedulesData] = await Promise.all([
        fetchData('/course/count', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading),
        fetchData('/course/completed/count', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading),
        fetchData('/schedule/count', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading)
      ]);

      this.coursesCount = coursesData.count;
      this.completedCoursesCount = completedCoursesData.count;
      this.timeSchedulesCount = timeSchedulesData.count;

      if (this.userRole === 'ADMIN' || this.userRole === 'TEACHER') {
        const usersData = await fetchData('/user/users/count', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
        this.usersCount = usersData.count;
      }
    } catch (error) {
      console.error('Error fetching dashboard data', error);
      this.errorMessage = 'Error fetching dashboard data';
    }
  }

  canModify(): boolean {
    return this.userRole === 'ADMIN';
  }
}
