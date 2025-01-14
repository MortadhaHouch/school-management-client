import { Component, OnInit } from '@angular/core';
import fetchData from '../../../utils/fetchData';
import { TimeSchedule, User } from '../../../utils/types';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-time-schedule',
  templateUrl: './time-schedule.component.html',
  styleUrls: ['./time-schedule.component.css'],
  imports:[NgIf,NgFor,NgClass]
})
export class TimeScheduleComponent implements OnInit {
  timeSchedules: TimeSchedule[] = [];
  isLoading: boolean = false;
  user: User | null = null;
  errorMessage:string="";
  ngOnInit(): void {
    this.fetchTimeSchedules();
    this.fetchUser();
  }
  isDark:boolean = false;
  constructor(themeService:ThemeService,private cookieService:CookieService){
    this.isDark = themeService.checkIsDark()
  }
  async fetchTimeSchedules(): Promise<void> {
    try {
      const data = await fetchData('/schedule', 'GET', undefined, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      if(data.message){
        this.errorMessage= data.message;
      }else{
        this.timeSchedules = data.time_schedules
      }
    } catch (error) {
      console.error('Error fetching time schedules', error);
    }
  }

  async fetchUser(): Promise<void> {
    try {
      this.user = await fetchData('/user/users', 'GET', undefined, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading); // Adjust the endpoint as needed
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }

  canModify(): boolean {
    return this.user && (this.user.role === 'ADMIN' || this.user.role === 'TEACHER') || false;
  }
}
