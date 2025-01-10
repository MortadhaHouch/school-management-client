import { Component } from '@angular/core';
import { images } from '../../../utils/constants';
import { NgFor } from '@angular/common';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images:{path:string,caption:string,paragraph:string}[] = images;
}
