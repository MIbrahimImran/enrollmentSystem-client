import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { EnrollmentPageComponent } from './pages/enrollment-page/enrollment-page.component';
import { AuthGuard } from './auth/auth.guard';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['registrar', 'advisor'] },
  },
  {
    path: 'course',
    component: CoursePageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['registrar', 'advisor'] },
  },
  {
    path: 'student',
    component: StudentPageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['registrar', 'advisor'] },
  },
  {
    path: 'enrollment',
    component: EnrollmentPageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['registrar', 'advisor'] },
  },
  {
    path: 'schedule',
    component: SchedulePageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['student'] },
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
