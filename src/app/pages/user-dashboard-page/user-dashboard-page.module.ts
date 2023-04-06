import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { UserDashboardPageComponent } from './user-dashboard-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UserDashboardPageComponent],
  imports: [CommonModule, CoreModule, MatSidenavModule, MatButtonModule],
  exports: [],
})
export class UserDashboardPageModule {}
