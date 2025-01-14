import { ThemeService } from './../services/theme.service';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import fetchData from '../../../utils/fetchData';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import {jwtDecode} from "jwt-decode"
import { Router } from '@angular/router';
import { AccessType } from '../../../utils/types';
import sign from "jwt-encode"
import environment from '../../../environment/environment';
import { AuthGuard } from '../services/auth.guard.spec';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnChanges{
  email:string = "";
  password:string = "";
  isLoading:boolean = false;
  router:Router|undefined;
  authGuard:AuthService|undefined;
  isDark:boolean = false;
  setIsLoading(isLoading:boolean){
    this.isLoading =isLoading;
  }
  cookieOptions: CookieOptions = {
    path: '/',
    expires: new Date(Date.now() + 3600 * 1000 * 24 * 7), // 7 days
  };
  ngOnChanges(change:SimpleChanges){
    console.log(change);
  }
  constructor(private cookieService:CookieService,router:Router,authGuard:AuthService,themeService:ThemeService){
    this.router = router;
    this.authGuard = authGuard;
    this.isDark = themeService.checkIsDark()
    if(this.cookieService.check("auth-token")){
      router.navigate(["/"]);
    }
  }
  async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    try {
      const response = await fetchData(
        "/user/login",
        "POST",
        {
          email: this.email,
          password: this.password,
        },
        undefined,
        (isLoading: boolean) => this.setIsLoading(isLoading)
      );

      if (typeof(response.token) === "string" && jwtDecode<AccessType>(response.token).isVerified) {
        const userCoords = jwtDecode<AccessType>(response.token);
        console.log(userCoords);
        this.cookieService.set("auth-token",sign({
          firstName:userCoords.firstName,
          lastName:userCoords.lastName,
          email:userCoords.email,
        },environment.SECRET_KEY), this.cookieOptions);
        this.authGuard?.login(userCoords);
        this.router?.navigate(["/dashboard"]);
      } else {
        alert("User is not verified. Please verify your email.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
