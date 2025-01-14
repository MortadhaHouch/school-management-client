import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import fetchData from '../../../utils/fetchData';
import { CookieService } from 'ngx-cookie-service';
import { TimeSchedule } from '../../../utils/types';

@Component({
  selector: 'app-time-schedule-admin',
  templateUrl: './time-schedule-admin.component.html',
  styleUrls: ['./time-schedule-admin.component.css']
})
export class TimeScheduleAdminComponent implements OnInit {
  timeSchedules: TimeSchedule[] = [];
  isLoading: boolean = false;
  isEditing: boolean = false;
  currentSchedule: TimeSchedule | null = null;
  scheduleForm: FormGroup;

  constructor(private fb: FormBuilder,private cookieService:CookieService) {
    this.scheduleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchTimeSchedules();
  }

  async fetchTimeSchedules(): Promise<void> {
    try {
      this.timeSchedules = await fetchData('/api/time-schedules', 'GET', undefined, undefined, (isLoading: boolean) => this.isLoading = isLoading);
    } catch (error) {
      console.error('Error fetching time schedules', error);
    }
  }

  async addTimeSchedule(): Promise<void> {
    if (this.scheduleForm.invalid) return;

    try {
      const newSchedule = await fetchData('/api/time-schedules', 'POST', this.scheduleForm.value,this.cookieService.get("auth-token"),(isLoading: boolean) => this.isLoading = isLoading);
      this.timeSchedules.push(newSchedule);
      this.scheduleForm.reset();
    } catch (error) {
      console.error('Error adding time schedule', error);
    }
  }

  async editTimeSchedule(schedule: TimeSchedule): Promise<void> {
    this.isEditing = true;
    this.currentSchedule = schedule;
    this.scheduleForm.patchValue(schedule);
  }

  async updateTimeSchedule(): Promise<void> {
    if (this.scheduleForm.invalid || !this.currentSchedule) return;

    try {
      const updatedSchedule = await fetchData(`/schedules/${this.currentSchedule._id}`, 'PUT', this.scheduleForm.value,undefined,(isLoading:boolean)=>isLoading);
      const index = this.timeSchedules.findIndex(s => s._id === this.currentSchedule!._id);
      this.timeSchedules[index] = updatedSchedule;
      this.isEditing = false;
      this.currentSchedule = null;
      this.scheduleForm.reset();
    } catch (error) {
      console.error('Error updating time schedule', error);
    }
  }

  async deleteTimeSchedule(scheduleId: string): Promise<void> {
    try {
      await fetchData(`/schedules/${scheduleId}`, 'DELETE',undefined,undefined,(isLoading:boolean)=>isLoading);
      this.timeSchedules = this.timeSchedules.filter(s => s._id !== scheduleId);
    } catch (error) {
      console.error('Error deleting time schedule', error);
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentSchedule = null;
    this.scheduleForm.reset();
  }
}
