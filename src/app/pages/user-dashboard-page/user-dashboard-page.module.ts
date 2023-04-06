import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { UserDashboardPageComponent } from './user-dashboard-page.component';

@NgModule({
  declarations: [UserDashboardPageComponent],
  imports: [CommonModule, CoreModule],
  exports: [],
})
export class UserDashboardPageModule {}
