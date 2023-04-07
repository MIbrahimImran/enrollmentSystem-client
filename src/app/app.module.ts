import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDashboardPageModule } from './pages/dashboard-page/dashboard-page.module';
import { CoursePageModule } from './pages/course-page/course-page.module';
import { StudentPageModule } from './pages/student-page/student-page.module';
import { EnrollmentPageModule } from './pages/enrollment-page/enrollment-page.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
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
