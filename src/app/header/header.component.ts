import { ThemeService } from './../services/theme.service';
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroHome, heroInformationCircle, heroUsers } from '@ng-icons/heroicons/outline';

import { bootstrapBook, bootstrapClockHistory, bootstrapMoon } from '@ng-icons/bootstrap-icons';

import { ionEnterOutline, ionLogInOutline, ionLogOutOutline } from '@ng-icons/ionicons';
import { matAccessTimeFilledOutline, matDashboardOutline } from "@ng-icons/material-icons/outline"
import { AuthService } from '../services/auth.service';
import {bootstrapSun} from "@ng-icons/bootstrap-icons"
import fetchData from '../../../utils/fetchData';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf,NgIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  viewProviders: [provideIcons({ heroHome,ionEnterOutline,ionLogInOutline,bootstrapClockHistory, heroInformationCircle,matDashboardOutline,bootstrapSun,bootstrapMoon,bootstrapBook,matAccessTimeFilledOutline,ionLogOutOutline })]
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  authService:AuthService = new AuthService();
  isLoggedIn:boolean = this.authService.isLoggedIn();
  isLoading:boolean = false;
  isDark:boolean = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleTheme(){
    this.themeService.toggleTheme();
  }
  constructor(private cookieService:CookieService,private router:Router,private themeService:ThemeService){
    this.isDark = this.themeService.checkIsDark();
  }
  async logout(){
    try{
      const response = await fetchData("/user/logout","PUT",undefined,this.cookieService.get("auth-token"),(isLoading:boolean)=>isLoading);
      if(response.message){
        this.cookieService.delete("auth-token");
        this.isLoading = false;
        this.isLoggedIn = false;
      }
      this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigate(["/"]);
    }catch(e){
      console.log(e);
      alert("An error occurred while trying to log out");
    }
  }
}
