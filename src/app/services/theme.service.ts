// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = false;
  checkIsDark(){
    return !!localStorage.getItem('theme');
  }
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    console.log(this.isDarkMode);
    localStorage.setItem('theme', JSON.stringify(this.isDarkMode));
    this.updateTheme();
  }

  private updateTheme(): void {
    const root = document.body;
    root.classList.toggle('theme', !this.isDarkMode);
  }
}
