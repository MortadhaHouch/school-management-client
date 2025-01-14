import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[NgClass]
})
export class DashboardComponent implements OnInit {
  coursesCount: number = 0;
  usersCount: number = 0;
  completedCoursesCount: number = 0;
  userRole: string = '';
  userAvatar:string|null = localStorage.getItem('avatar');
  firstName:string|null = localStorage.getItem('firstName');
  lastName:string|null = localStorage.getItem('lastName');
  email:string|null = localStorage.getItem('email');
  isDark:boolean = false;
  constructor(themeService:ThemeService, private router: Router){
    this.isDark = themeService.checkIsDark()
  }
  ngOnInit(){

  }
}
