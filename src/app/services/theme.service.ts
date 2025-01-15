// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(this.checkIsDark());
  isDark = this.isDarkTheme.asObservable();

  constructor() {
    this.isDarkTheme.subscribe(() => this.updateTheme());
  }

  checkIsDark(): boolean {
    return !!localStorage.getItem('theme');
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkTheme.value;
    this.isDarkTheme.next(newTheme);
    // Update localStorage to persist the theme preference
    if (newTheme) {
      localStorage.setItem('theme', JSON.stringify(newTheme));
    } else {
      localStorage.setItem('theme',JSON.stringify(!JSON.parse(localStorage.getItem("theme")||"false")));
    }
  }

  private updateTheme(): void {
    const root = document.body;
    const darkModeEnabled = this.isDarkTheme.value;
    root.classList.toggle('theme', darkModeEnabled);  // Apply the 'theme' class based on dark mode state
  }
}
