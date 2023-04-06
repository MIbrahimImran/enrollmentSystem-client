import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserDashboardPageComponent } from './pages/user-dashboard-page/user-dashboard-page.component';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { EnrollmentPageComponent } from './pages/enrollment-page/enrollment-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    component: UserDashboardPageComponent,
  },
  {
    path: 'course',
    component: CoursePageComponent,
  },
  {
    path: 'student',
    component: StudentPageComponent,
  },
  {
    path: 'enrollment',
    component: EnrollmentPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
