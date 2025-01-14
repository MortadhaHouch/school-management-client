import { Component, OnInit } from '@angular/core';
import fetchData from '../../../utils/fetchData';
import { TimeSchedule, User } from '../../../utils/types';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ThemeService } from '../services/theme.service';

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

  ngOnInit(): void {
    this.fetchTimeSchedules();
    this.fetchUser();
  }
  isDark:boolean = false;
  constructor(themeService:ThemeService){
    this.isDark = themeService.checkIsDark()
  }
  async fetchTimeSchedules(): Promise<void> {
    try {
      this.timeSchedules = await fetchData('/schedule', 'GET', undefined, undefined, (isLoading: boolean) => this.isLoading = isLoading);
    } catch (error) {
      console.error('Error fetching time schedules', error);
    }
  }

  async fetchUser(): Promise<void> {
    try {
      this.user = await fetchData('/user/users', 'GET', undefined, undefined, (isLoading: boolean) => this.isLoading = isLoading); // Adjust the endpoint as needed
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }

  canModify(): boolean {
    return this.user && (this.user.role === 'ADMIN' || this.user.role === 'TEACHER') || false;
  }
}
