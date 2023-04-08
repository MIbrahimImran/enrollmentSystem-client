import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [StatsCardComponent],
  imports: [CommonModule, MatCardModule, MatIconModule],
  exports: [StatsCardComponent],
})
export class StatisticsModule {}
