import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { DashboardPageComponent } from './dashboard-page.component';
import { StatisticsModule } from 'src/app/features/statistics/statistics.module';
import { MatGridListModule } from '@angular/material/grid-list';
@NgModule({
  declarations: [DashboardPageComponent],
  imports: [CommonModule, CoreModule, StatisticsModule, MatGridListModule],
  exports: [],
})
export class UserDashboardPageModule {}
