import { Component, OnInit } from '@angular/core';
import fetchData from '../../../utils/fetchData';
import { CookieService } from 'ngx-cookie-service';
import { TimeSchedule } from '../../../utils/types';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-time-schedule',
  templateUrl: './time-schedule.component.html',
  styleUrls: ['./time-schedule.component.css'],
  imports:[NgClass,NgFor,NgIf]
})
export class TimeScheduleComponent implements OnInit {
  timeSchedules: TimeSchedule[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  userRole: string = '';
  isDark:boolean = false;
  constructor(private cookieService: CookieService,private themeService:ThemeService) {
    this.isDark = themeService.checkIsDark()
  }

  ngOnInit(): void {
    this.fetchTimeSchedules();
    this.fetchUserRole();
  }

  async fetchTimeSchedules(): Promise<void> {
    try {
      const response = await fetchData('/schedule', 'GET', undefined, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading) as {time_schedules:TimeSchedule[]};
      if(Array.isArray(response)){
        this.timeSchedules = response.time_schedules;
      }
    } catch (error) {
      console.error('Error fetching time schedules', error);
      this.errorMessage = 'Error fetching time schedules';
    }
  }

  async fetchUserRole(): Promise<void> {
    try {
      const userData = await fetchData('/user/role', 'GET', undefined, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      console.log(userData);
      this.userRole = userData.role;
    } catch (error) {
      console.error('Error fetching user role', error);
      this.errorMessage = 'Error fetching user role';
    }
  }

  canModify(): boolean {
    return this.userRole === 'ADMIN';
  }

  isTeacherOrAdmin(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'TEACHER';
  }

  async editTimeSchedule(schedule: TimeSchedule): Promise<void> {
    // Implement edit logic here
  }

  async deleteTimeSchedule(scheduleId: string): Promise<void> {
    try {
      await fetchData(`/schedule/${scheduleId}`, 'DELETE', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.timeSchedules = this.timeSchedules.filter(s => s.id !== scheduleId);
    } catch (error) {
      console.error('Error deleting time schedule', error);
      this.errorMessage = 'Error deleting time schedule';
    }
  }

  async addTimeSchedule(): Promise<void> {
    // Implement add logic here
  }
}
