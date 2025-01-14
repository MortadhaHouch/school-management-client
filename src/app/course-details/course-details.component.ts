import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../utils/types';
import fetchData from '../../../utils/fetchData';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  imports: [NgClass, NgIcon, NgFor, NgIf]
})
export class CourseDetailsComponent implements OnInit {
  course: Course | undefined;
  isDark: boolean = false;
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.fetchCourseDetails(courseId);
    this.isDark = !!localStorage.getItem('theme');
  }

  async fetchCourseDetails(courseId: string | null): Promise<void> {
    if (courseId) {
      try {
        const data = await fetchData(`/courses/${courseId}`,"GET",{},undefined,(isLoading:boolean)=>isLoading);
        this.course = data;
      } catch (error) {
        console.error('Error fetching course details', error);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
