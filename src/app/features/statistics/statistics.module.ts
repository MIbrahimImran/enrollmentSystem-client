import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [StatsCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [StatsCardComponent],
})
export class StatisticsModule {}
