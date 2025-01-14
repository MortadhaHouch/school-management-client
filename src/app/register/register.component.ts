import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import fetchData from '../../../utils/fetchData';
import { jwtDecode } from 'jwt-decode';
import { AccessType } from '../../../utils/types';
import { FormsModule } from '@angular/forms';
import fileReading from '../../../utils/fileReading';
import { NgIf } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName:string="";
  lastName:string="";
  email:string="";
  password:string="";
  isLoading:boolean = false;
  avatar:string="";
  router:Router = new Router();
  isDark:boolean = false;
  cookieOptions:CookieOptions = {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    path: '/'
  }
  constructor(private cookieService:CookieService,router:Router,themeService:ThemeService){
    this.isDark = themeService.checkIsDark()
    if(this.cookieService.check("auth-token")){
      router.navigate(["/"]);
    }
  }
  setIsLoading(isLoading:boolean){
    this.isLoading = isLoading;
  }
  async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    try {
      const response = await fetchData(
        "/user/register",
        "POST",
        {
          email: this.email,
          password: this.password,
          firstName:this.firstName,
          lastName: this.lastName,
          path: this.avatar
        },
        undefined,
        (isLoading: boolean) => this.setIsLoading(isLoading)
      );

      if (typeof(response.token) === "string" && jwtDecode<AccessType>(response.token).isVerified) {
        this.cookieService.set("auth-token", response.token, this.cookieOptions);
        const userCoords = jwtDecode<AccessType>(response.token);
        localStorage.setItem("firstName",userCoords.firstName);
        localStorage.setItem("lastName",userCoords.lastName);
        localStorage.setItem("email",userCoords.email);
        this.router?.navigate(["/dashboard"]);
      } else {
        alert("User is not verified. Please verify your email.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async handleFileReading(event:any) {
    try {
      const fileData = await fileReading(event.target.files[0]);
      if(fileData && typeof(fileData) === "string"){
        this.avatar = fileData;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
