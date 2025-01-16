import { ThemeService } from './../services/theme.service';
import { Component, OnInit } from '@angular/core';
import fetchData from '../../../utils/fetchData';
import { CookieService } from 'ngx-cookie-service';
import { Course, Room, TimeSchedule } from '../../../utils/types';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css'],
  imports:[NgIf,NgFor,FormsModule,NgClass]
})
export class AdminManageComponent implements OnInit {
  rooms: Room[] = [];
  timeSchedules: TimeSchedule[] = [];
  courses: Course[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  userRole: string = '';
  isDark: boolean = false;

  newRoom: Partial<Room> = {};
  newTimeSchedule: Partial<TimeSchedule> = {};
  newCourse: Partial<Course> = {};

  constructor(private cookieService: CookieService,private themeService:ThemeService) {
    this.isDark = this.themeService.checkIsDark();
  }

  ngOnInit(): void {
    this.fetchUserRole();
    this.fetchRooms();
    this.fetchTimeSchedules();
    this.fetchCourses();
  }

  async fetchUserRole(): Promise<void> {
    try {
      const userData = await fetchData('/user/role', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.userRole = userData.role;
      if (this.userRole !== 'admin') {
        this.errorMessage = 'You are not authorized to access this page.';
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      this.errorMessage = 'Error fetching user role';
    }
  }

  async fetchRooms(): Promise<void> {
    try {
      this.rooms = await fetchData('/room', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
    } catch (error) {
      console.error('Error fetching rooms', error);
      this.errorMessage = 'Error fetching rooms';
    }
  }

  async fetchTimeSchedules(): Promise<void> {
    try {
      this.timeSchedules = await fetchData('/schedule', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
    } catch (error) {
      console.error('Error fetching time schedules', error);
      this.errorMessage = 'Error fetching time schedules';
    }
  }

  async fetchCourses(): Promise<void> {
    try {
      this.courses = await fetchData('/course', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
    } catch (error) {
      console.error('Error fetching courses', error);
      this.errorMessage = 'Error fetching courses';
    }
  }

  canModify(): boolean {
    return this.userRole === 'ADMIN';
  }

  async addRoom(): Promise<void> {
    if (!this.canModify()) {
      this.errorMessage = 'You are not authorized to add rooms';
      return;
    }

    try {
      const addedRoom = await fetchData('/room', 'POST', this.newRoom, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.rooms.push(addedRoom);
      this.newRoom = {}; // Reset form
    } catch (error) {
      console.error('Error adding room:', error);
      this.errorMessage = 'Error adding room';
    }
  }

  async editRoom(room: Room): Promise<void> {
    if (!this.canModify()) {
      this.errorMessage = 'You are not authorized to edit rooms';
      return;
    }

    try {
      const updatedRoom = await fetchData(`/room/${room.id}`, 'PUT', room, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      const index = this.rooms.findIndex(r => r.id === room.id);
      if (index !== -1) {
        this.rooms[index] = updatedRoom;
      }
    } catch (error) {
      console.error('Error editing room:', error);
      this.errorMessage = 'Error editing room';
    }
  }

  async deleteRoom(roomId: string): Promise<void> {
    if (!this.canModify()) {
      this.errorMessage = 'You are not authorized to delete rooms';
      return;
    }

    try {
      await fetchData(`/room/${roomId}`, 'DELETE', undefined, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.rooms = this.rooms.filter(r => r.id !== roomId);
    } catch (error) {
      console.error('Error deleting room:', error);
      this.errorMessage = 'Error deleting room';
    }
  }

  async addTimeSchedule(): Promise<void> {
    if (!this.canModify()) {
      this.errorMessage = 'You are not authorized to add time schedules';
      return;
    }

    try {
      const addedTimeSchedule = await fetchData('/schedule', 'POST', this.newTimeSchedule, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.timeSchedules.push(addedTimeSchedule);
      this.newTimeSchedule = {}; // Reset form
    } catch (error) {
      console.error('Error adding time schedule:', error);
      this.errorMessage = 'Error adding time schedule';
    }
  }

  async editTimeSchedule(timeSchedule: TimeSchedule): Promise<void> {
    if (!this.canModify()) {
      this.errorMessage = 'You are not authorized to edit time schedules';
      return;
    }

    try {
      const updatedTimeSchedule = await fetchData(`/schedule/${timeSchedule.id}`, 'PUT', timeSchedule, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      const index = this.timeSchedules.findIndex(ts => ts.id === timeSchedule.id);
      if (index !== -1) {
        this.timeSchedules[index] = updatedTimeSchedule;
      }
    } catch (error) {
      console.error('Error editing time schedule:', error);
      this.errorMessage = 'Error editing time schedule';
    }
  }

  async deleteTimeSchedule(timeScheduleId: string): Promise<void> {
    if (!this.canModify()) {
      this.errorMessage = 'You are not authorized to delete time schedules';
      return;
    }

    try {
      await fetchData(`/schedule/${timeScheduleId}`, 'DELETE', undefined, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.timeSchedules = this.timeSchedules.filter(ts => ts.id !== timeScheduleId);
    } catch (error) {
      console.error('Error deleting time schedule:', error);
      this.errorMessage = 'Error deleting time schedule';
    }
  }

  async addCourse(): Promise<void> {
    if (!this.canModify()) {
      this.errorMessage = 'You are not authorized to add courses';
      return;
    }

    try {
      const addedCourse = await fetchData('/course', 'POST', this.newCourse, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.courses.push(addedCourse);
      this.newCourse = {}; // Reset form
    } catch (error) {
      console.error('Error adding course:', error);
      this.errorMessage = 'Error adding course';
    }
  }

  async editCourse(course: Course): Promise<void> {
    if (!this.canModify()) {
      this.errorMessage = 'You are not authorized to edit courses';
      return;
    }

    try {
      const updatedCourse = await fetchData(`/course/${course.id}`, 'PUT', course, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      const index = this.courses.findIndex(c => c.id === course.id);
      if (index !== -1) {
        this.courses[index] = updatedCourse;
      }
    } catch (error) {
      console.error('Error editing course:', error);
      this.errorMessage = 'Error editing course';
    }
  }

  async deleteCourse(courseId: string): Promise<void> {
    if (!this.canModify()) {
      this.errorMessage = 'You are not authorized to delete courses';
      return;
    }

    try {
      await fetchData(`/course/${courseId}`, 'DELETE', undefined, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.courses = this.courses.filter(c => c.id !== courseId);
    } catch (error) {
      console.error('Error deleting course:', error);
      this.errorMessage = 'Error deleting course';
    }
  }
}
