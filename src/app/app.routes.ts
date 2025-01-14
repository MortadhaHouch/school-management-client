import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecentComponent } from './recent/recent.component';
import { AuthGuard } from './services/auth.guard.spec';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { TimeScheduleComponent } from './time-schedule/time-schedule.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },{
    path: 'recent',
    component:RecentComponent
  },{
    path: 'courses',
    component:CoursesComponent
  },{
    path: 'course/:id',
    component: CourseDetailsComponent
  },{
    path: 'time-schedule',
    component: TimeScheduleComponent
  }
];
