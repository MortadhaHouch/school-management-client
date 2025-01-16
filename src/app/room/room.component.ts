import { Component, OnInit } from '@angular/core';
import fetchData from '../../../utils/fetchData';
import { CookieService } from 'ngx-cookie-service';
import { Room } from '../../../utils/types';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  imports:[FormsModule,NgClass,NgIf,NgFor]
})
export class RoomComponent implements OnInit {
  rooms: Room[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  userRole: string = '';
  isDark: boolean = false;
  newRoom: Room = {
    id: '',
    name: '',
    capacity: 0,
    status: true,
    course: ''
  };

  editRoomData: Room | null = null;

  constructor(private cookieService: CookieService,private themeService:ThemeService) {
    this.isDark = this.themeService.checkIsDark();
  }

  ngOnInit(): void {
    this.fetchUserRole();
    this.fetchRooms();
  }

  async fetchUserRole(): Promise<void> {
    try {
      const userData = await fetchData('/user/role', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.userRole = userData.role;
    } catch (error) {
      console.error('Error fetching user role:', error);
      this.errorMessage = 'Error fetching user role';
    }
  }
  async fetchRooms(): Promise<void> {
    try {
      const data = await fetchData('/room', 'GET', {}, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      this.rooms = data.rooms
    } catch (error) {
      console.error('Error fetching rooms', error);
      this.errorMessage = 'Error fetching rooms';
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
      if(addedRoom.room){
        this.rooms.push(addedRoom.room);
        this.newRoom = { id: '', name: '', capacity: 0, status: true, course: '' }; // Reset form
      }
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

    this.editRoomData = { ...room }; // Set the room data to be edited
  }

  async updateRoom(): Promise<void> {
    if (!this.canModify() || !this.editRoomData) {
      this.errorMessage = 'You are not authorized to edit rooms';
      return;
    }

    try {
      console.log(this.editRoomData);
      const updatedRoom = await fetchData(`/room/${this.editRoomData.id}`, 'PUT', this.editRoomData, this.cookieService.get("auth-token"), (isLoading: boolean) => this.isLoading = isLoading);
      const index = this.rooms.findIndex(r => r.id === this.editRoomData!.id);
      if (index !== -1) {
        this.rooms[index] = updatedRoom.updatedRoom;
      }
      this.editRoomData = null; // Reset edit form
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
}
