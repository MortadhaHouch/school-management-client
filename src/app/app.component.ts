import { ThemeService } from './services/theme.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import {CookieService} from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent,FormsModule,NgApexchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[CookieService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'client';
  themeService:ThemeService = new ThemeService();
  constructor(){
  }
  ngOnInit(): void {
    document.body.classList.toggle("dark",this.themeService.checkIsDark());
  }
}
