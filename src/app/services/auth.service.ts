import { Injectable } from '@angular/core';
import { AccessType } from '../../../utils/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Simulate checking authentication status
  isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn')||"false");  // Checks if a token exists
  }

  login(coords: AccessType): void {
    localStorage.setItem("firstName",coords.firstName);
    localStorage.setItem("lastName",coords.lastName);
    localStorage.setItem("email",coords.email);
    localStorage.setItem("avatar",coords.avatar);
    localStorage.setItem("isLoggedIn",JSON.stringify(coords.isLoggedIn));
  }

  logout(): void {
    localStorage.clear();
  }
}
