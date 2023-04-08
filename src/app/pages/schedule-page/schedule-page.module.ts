import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulePageComponent } from './schedule-page.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { EnrollmentModule } from 'src/app/features/enrollment/enrollment.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SchedulePageComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AgGridModule,
    EnrollmentModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SchedulePageModule {}
