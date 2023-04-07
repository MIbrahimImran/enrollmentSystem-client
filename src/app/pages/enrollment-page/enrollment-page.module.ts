import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentPageComponent } from './enrollment-page.component';
import { AgGridModule } from 'ag-grid-angular';
import { CoreModule } from 'src/app/core/core.module';
import { EnrollmentModule } from 'src/app/features/enrollment/enrollment.module';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [EnrollmentPageComponent],
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
export class EnrollmentPageModule {}
