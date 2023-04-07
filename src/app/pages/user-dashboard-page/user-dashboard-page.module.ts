import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { UserDashboardPageComponent } from './user-dashboard-page.component';
import { StatisticsModule } from 'src/app/features/statistics/statistics.module';

@NgModule({
  declarations: [UserDashboardPageComponent],
  imports: [CommonModule, CoreModule, StatisticsModule],
  exports: [],
})
export class UserDashboardPageModule {}
