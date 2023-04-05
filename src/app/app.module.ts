import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDashboardPageModule } from './pages/user-dashboard-page/user-dashboard-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginPageModule,
    UserDashboardPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
