import { ThemeService } from './../services/theme.service';
import { Component } from '@angular/core';
import { images } from '../../../utils/constants';
import { NgClass, NgFor } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { RouterLink } from '@angular/router';
// register Swiper custom elements
register();
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports:[NgClass,RouterLink]
})
export class HomeComponent {
  images:{path:string,caption:string,paragraph:string}[] = images;
  isDark:boolean = false;
  constructor(themeService:ThemeService){
    this.isDark = themeService.checkIsDark()
  }
}
