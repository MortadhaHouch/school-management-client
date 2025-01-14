import { ThemeService } from './../services/theme.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../../utils/types';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapBookmark, bootstrapBookmarkFill } from '@ng-icons/bootstrap-icons';
import { courses } from '../../../utils/constants';
import { Router } from '@angular/router';
import fetchData from "../../../utils/fetchData"

@Component({
  selector: 'app-courses',
  imports: [NgClass,NgIcon,NgIf,NgFor],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  viewProviders:[provideIcons({bootstrapBookmark,bootstrapBookmarkFill})]
})
export class CoursesComponent implements OnInit{
  isDark:boolean = false;
  courses:Course[] = [];
  isLoading:boolean = false;
  setIsLoading(isLoading:boolean):void{
    this.isLoading = isLoading;
  }
  constructor(themeService:ThemeService, private router: Router){
    this.isDark = themeService.checkIsDark()
  }
  ngOnInit(): void {
    // this.handleLoadingData();
    console.log(this.courses);
  }
  async handleLoadingData(){
    try {
      const request = await fetchData("/course","GET",undefined,undefined,(isLoading:boolean)=>this.setIsLoading(isLoading));
      if(Array.isArray(request)){
        this.courses = request;
        console.log(this.courses);
      }
    } catch (error) {
      console.log(error);
    }
  }
  viewDetails(courseId: string): void {
    this.router.navigate(['/course', courseId]);
  }
  exploreOtherSections(): void {
    this.router.navigate(['/recent']);
  }
}
