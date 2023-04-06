import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentPageComponent } from './enrollment-page.component';
import { AgGridModule } from 'ag-grid-angular';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [EnrollmentPageComponent],
  imports: [CommonModule, CoreModule, AgGridModule],
})
export class EnrollmentPageModule {}
