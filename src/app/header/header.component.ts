import { ThemeService } from './../services/theme.service';
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroHome, heroInformationCircle, heroUsers } from '@ng-icons/heroicons/outline';

import { bootstrapBook, bootstrapClockHistory, bootstrapMoon } from '@ng-icons/bootstrap-icons';

import { ionEnterOutline, ionLogInOutline } from '@ng-icons/ionicons';
import { matAccessTimeFilledOutline, matDashboardOutline } from "@ng-icons/material-icons/outline"
import { AuthService } from '../services/auth.service';
import {bootstrapSun} from "@ng-icons/bootstrap-icons"
@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf,NgIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  viewProviders: [provideIcons({ heroHome,ionEnterOutline,ionLogInOutline,bootstrapClockHistory, heroInformationCircle,matDashboardOutline,bootstrapSun,bootstrapMoon,bootstrapBook,matAccessTimeFilledOutline })]
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  authService:AuthService = new AuthService();
  isLoggedIn:boolean = this.authService.isLoggedIn();
  themeService:ThemeService = new ThemeService();
  isDark:boolean = this.themeService.checkIsDark();
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleTheme(){
    this.themeService.toggleTheme();
  }
}
