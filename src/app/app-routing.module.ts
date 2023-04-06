import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserDashboardPageComponent } from './pages/user-dashboard-page/user-dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    component: UserDashboardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
