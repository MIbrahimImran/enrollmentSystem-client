import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDashboardPageModule } from './pages/user-dashboard-page/user-dashboard-page.module';
import { CoursePageModule } from './pages/course-page/course-page.module';
import { StudentPageModule } from './pages/student-page/student-page.module';
import { EnrollmentPageComponent } from './pages/enrollment-page/enrollment-page.component';
import { EnrollmentPageModule } from './pages/enrollment-page/enrollment-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    LoginPageModule,
    UserDashboardPageModule,
    CoursePageModule,
    StudentPageModule,
    EnrollmentPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
